---
layout: post
title:  "How To Use d3 with Angular"
date:   2017-11-17
author: Andy Perlitch
desc: "You can wrap d3 visualization logic into Angular components using this design pattern."
keywords: "d3.js,angular,typescript,typings,library"
categories: [tutorials]
tags: [d3,typescript,library,module,plugin]
icon: icon-typescript
---

**[Angular](https://angular.io/)** is a feature-rich application framework, and **[d3.js](https://d3js.org/)** is an effective visualization library. In this post I'll be walking through how I use the two together


## Wrap it in a Component

The visual aspects of an Angular application are organized into components, and so d3 code ought to go into component code. The rules I follow when doing this are:

1. All `d3` objects and functions that don't need to be re-initialized every time the visualization has to update should be created in the constructor. This includes things like `d3.scaleLinear()` and `d3.forcedLayout()`.

2. Inject the `ElementRef` of the component so you can use it to append and set up the `<svg>` element inside the component's markup.

3. Set `this.svg` (or whatever you want to call the reference to the base d3 `<svg>` element) inside of `ngOnInit`.

4. Create a debounced render function which contains your d3 rendering logic. I like to debounce it so that multiple calls to it do not overwork the browser or cause weirdness in animations.

5. Call the render function created above in `ngOnChanges`.


Here is an annotated "pie chart" example of a component written in such a way:

```typescript
import { Component, OnInit, OnChanges, Input, ElementRef, HostListener } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';

// this interface is specific to this example
interface IMetric {
  key: string;
  color: string;
}

/**
 * Declare the component like any other angular component
 */
@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges, OnInit {


  // These inputs are specific to this pie chart example but you
  // could have any inputs related to what you're visualizing
  @Input()
  metrics: IMetric[];

  @Input()
  datum: any;

  // This will hold the main <g> element inside the single <svg> of this component.
  // Still trying to work out the right way to handle types, `any` is fine for now.
  private svg: d3.Selection<SVGElement, {}, null, undefined> // TODO: better type signature
  
  // This is a debounced version of the real render function (this._render), to prevent render thrashing
  // Also add the hostlistener for window resize events if that is relevant
  @HostListener('window:resize')
  private render = _.debounce(this._render);

  // In this example, we need a d3.arc function. We will
  // initialize this in the constructor
  private arc: d3.Arc<any, ISliceDatum>;


  // All d3 functions and objects that don't need to be re-initialized on every render should be
  // created here. In this example, just this.arc falls under that category.
  // Also note that this.element is getting injected here. It is the root element for this component.
  // We are going to use this in ngOnInit.
  constructor(private element: ElementRef) {

    // Set up scales and d3 functions here.
    this.arc = d3.arc<any, ISliceDatum>()
      .cornerRadius(2);
  }

  // Use this lifecycle hook to initialize the svg element where all
  // the visualizations go.
  ngOnInit() {
    this.svg = d3.select(element.nativeElement)
      .append('svg')
      .append('g')
      .classed('piechart', true);
  }

  // You will want to call the debounced public render function
  // whenever changes are detected, assuming changes of @Input
  // values should trigger a re-render. You can of course be more
  // granular with what triggers render.
  ngOnChanges() {
    this.render();
  }

  // This is where the actual render logic resides. This should look like
  // normal d3 usage that you see in most d3 examples.
  private _render() {

    // create the data to bind
    let total = 0;
    let sliceData: ISliceDatum[] = this.metrics.map(metric => {
      let value = mu.getValue(metric, this.datum);
      let offset = total;
      total += value;
      return { metric, value, offset }
    });
    let toRadians = Math.PI / total;

    // This updates the d3.arc function
    this.arc
      .startAngle(d => d.offset * toRadians)
      .endAngle(d => (d.offset + d.value) * toRadians);

    // assign the data
    let slices = this.svg
      .selectAll('path.slices')
      .data(sliceData, (d: ISliceDatum) => d.metric.id)
    
    // EXIT SLICES
    slices.exit()
      .transition()
      .style('opacity', 0)
      .remove();

    // ENTER SLICES
    let newSlices = slices.enter()
      .append('path')
      // etc..

    // MERGE NEW
    slices = newSlices.merge(slices);

    // UPDATE SLICES
    slices
      .attr('fill', (d: ISliceDatum) => d.metric.color)
      // etc.

  }

}

```


Certainly there are likely other approaches to working with d3 and angular, but so far this has worked for my use-cases. Feedback is welcome and appreciated!


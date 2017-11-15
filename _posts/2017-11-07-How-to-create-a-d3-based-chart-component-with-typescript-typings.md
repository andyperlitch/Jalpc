---
layout: post
title:  "How To Create A d3-based Chart Component With Typescript"
date:   2017-01-31
author: Andy Perlitch
desc: "Build custom, reusable d3-based charts as an npm module with Typescript type definitions."
keywords: "d3.js,npm,modularity,typescript,typings,library"
categories: [tutorials]
tags: [d3,typescript,library,module,plugin]
icon: icon-typescript
---


In this post I am going to walk you through the process of creating a d3 plugin/library/extension with TypeScript and publishing it as an npm module.

## Why TypeScript?

TypeScript is statically-typed JavaScript, and is becoming more and more popular because static typing results in more maintainable projects and fewer bugs. At the same time, TypeScript does not take away the flexibility that is so powerful with JavaScript.

## Intended Usage

I would like to be able to use this as a simple global module, like this:

```html
<script src="path/to/my-lib/dist.js"></script>
<script>
  var myLib = new MyLib();
</script>
```

Additionally, I would like it to work in commonJS and TypeScript environments as well:

```typescript
import {MyLib} from 'my-lib';
let myLib = new MyLib();
```

## The Plugin 

The specific plugin I will be publishing is a chart that visualizes arbitrary skills in bar-chart form. We'll call it `d3-skills-barchart`. I built it for the home page of this site. Here it is in action:

<div id="skills-target"></div>
<script src="http://127.0.0.1:8080/index.js"></script>
<script>
var chart = new SkillsBarChart({
  target: '#skills-target',
  data: {{ site.data.index.skills | jsonify }}
});
chart.render();
</script>


Let's begin!


## 1. Initializing a new npm module

To start with, we will need a new folder which should be initialized as an npm module:

```bash
mkdir skills-barchart
cd skills-barchart
npm init
npm install d3 --save
npm install @types/d3@4 --save # for some reason, v3 is being considered the latest version without specifying `@4` at the end
```

Complete the prompts from the `npm init` command.

## 2. Add the `d.ts` definition file

Before doing anything else, let's define the interface of the plugin with the `index.d.ts` file.

It is recommended that we explicitly indicate where this library's definition file is in the `package.json`. Add the following line in that file:

```json
{
  // ...
  "types": "./index.d.ts",
  // ...
}
```







## Resources

https://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html
https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html
https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11367


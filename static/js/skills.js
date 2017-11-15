// function SkillsBarChart(options) {
//   if (options.data) {
//     this.data(options.data);
//   }
//   if (this.target) {
//     this.setElement(this.target);
//   }
// }

// SkillsBarChart.prototype = {
//   data: function(data) {
//     this._data = data;
//   },
//   setElement: function(el) {
//     this._el = el;
//     this._svg = d3.select(el).append('svg');
//   },
//   render: function(data) {
//     if (data) {
//       this.data(data);
//     }
//     if (!this._el || !this._data) {
//       throw new TypeError('SkillsBarChart: No target element and/or data has been set, cannot render.');
//     }

//     var category = this._svg.selectAll('g.')



//   }
// }



// var chart = new SkillsBarChart({
//   target: el,
//   data: [
//     {
//       name: 'Languages',
//       color: '#1F7AFF',
//       entries: [
//         {
//           name: 'JavaScript',
//           score: 100,
//           types: ['FE', 'BE']
//         },
//         {
//           name: 'HTML',
//           score: 100,
//           types: ['FE']
//         },
//         {
//           name: 'CSS',
//           score: 90,
//           types: ['FE']
//         },
//         {
//           name: 'SQL',
//           score: 75,
//           types: ['DB']
//         },
//         {
//           name: 'PHP',
//           score: 69,
//           types: ['BE']
//         },
//         {
//           name: 'Java',
//           score: 50,
//           types: ['BE']
//         },
//         {
//           name: 'Bash',
//           score: 40,
//           types: ['BE']
//         },
//         {
//           name: 'Python',
//           score: 35,
//           types: ['BE']
//         },
//         {
//           name: 'C#',
//           score: 25,
//           types: ['BE']
//         }
//       ]
//     },
//     {
//       name: 'Frameworks & Libraries',
//       color: '#02C14F',
//       entries: [
//         {
//           name: 'AngularJS',
//           score: 100,
//           types: ['FE']
//         },
//         {
//           name: 'd3.js',
//           score: 100,
//           types: ['FE']
//         },
//         {
//           name: 'jQuery',
//           score: 100,
//           types: ['FE']
//         },
//         {
//           name: 'ExpressJS',
//           score: 95,
//           types: ['BE']
//         },
//         {
//           name: 'Backbone.js',
//           score: 90,
//           types: ['FE']
//         },
//         {
//           name: 'Angular2+',
//           score: 70,
//           types: ['FE']
//         },
//         {
//           name: 'Spring',
//           score: 25,
//           types: ['BE']
//         }
//       ]

//     }
//   ]

// });
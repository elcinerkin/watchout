// start slingin' some d3 here.

// data - might be array of coordinates of enemies
var width = 600; // width of SVG element
var height = 400; // height of SVG element
var xOffset = 320; // width offset of SVG element from top-left of screen
var yOffset = 200; // width offset of SVG element from top-left of screen
var enemyCount = 10;
var refreshRate = 100;

var getCoordinates = function(){
  return [Math.random() * width, Math.random() * height];
};

var enemyXYCoordinates = []; // data

for (var i = 0; i < enemyCount; i++) {
  enemyXYCoordinates.push(getCoordinates());
}

// svg element
var svg = d3.select('body').append('svg').
  attr('height', height).attr('width', width).
  attr('transform', 'translate(' + xOffset + ',' + yOffset + ')');

// update function
var update = function(data) {
  //create enemies
  var field = svg.selectAll('div').data(data);

  field.enter()
  .append('svg:circle')
  .attr('class', 'enemy')
  .attr('cx', function(d) {
    return d[0];
  })
  .attr('cy', function(d) {
    return d[1];
  })
  .attr('r', 10);
};

// inital display
update(enemyXYCoordinates);

// refresh display
setInterval(update(enemyXYCoordinates), refreshRate);

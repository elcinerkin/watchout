// start slingin' some d3 here.

// data - might be array of coordinates of enemies
var width = 600; // width of SVG element
var height = 400; // height of SVG element
var xOffset = '320px'; // width offset of SVG element from top-left of screen
var yOffset = '200px'; // width offset of SVG element from top-left of screen
var enemyCount = 10;
var refreshRate = 1000;

var getCoordinates = function(){
  return [Math.random() * width, Math.random() * height];
};

var enemyXYCoordinatesObj = {}; // object that data's indexes refer to, e.g. enemyXYCoordinatesObj[0] === (x, y) of element 0
var enemyXYCoordinates = []; // data hash with values [0, 1, 2, ..., n]

for (var i = 0; i < enemyCount; i++) {
  enemyXYCoordinatesObj[i] = getCoordinates();
  enemyXYCoordinates.push(i);
}

// svg element
var svg = d3.select('body')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr('transform', 'translate(' + xOffset + ',' + yOffset + ')');

// update function
var update = function(data) {
  // DATA JOIN
  var field = svg.selectAll('circle').data(data);

  //UPDATE
  field.transition().duration(200)
    .attr('cx',  function(d) {
      return enemyXYCoordinatesObj[d][0];
    })
    .attr('cy', function(d) {
      return enemyXYCoordinatesObj[d][1];
    });

  // ENTER - create enemies
  field.enter()
    .append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(d) {
      return enemyXYCoordinatesObj[d][0];
    })
    .attr('cy', function(d) {
      return enemyXYCoordinatesObj[d][1];
    })
    .attr('r', 10);
};

// inital display
update(enemyXYCoordinates);


// refresh display
setInterval(function(){
  for (var i = 0; i < enemyCount; i++) {
    enemyXYCoordinatesObj[i] = getCoordinates();
  }
  update(enemyXYCoordinates);
},  refreshRate);

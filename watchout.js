// start slingin' some d3 here.

// data - might be array of coordinates of enemies
var width = 600; // width of SVG element
var height = 400; // height of SVG element
var xOffset = '320px'; // width offset of SVG element from top-left of screen
var yOffset = '200px'; // width offset of SVG element from top-left of screen
var enemyCount = 10;
var refreshRateEnemy = 1500;
var refreshRatePlayer = 10;

var getCoordinates = function(){
  return [Math.random() * width, Math.random() * height];
};

var enemyXYCoordinatesObj = {}; // object that data's indexes refer to, e.g. enemyXYCoordinatesObj[0] === (x, y) of element 0
var enemyXYCoordinates = []; // data hash with values [0, 1, 2, ..., n]
var playerXYCoordinatesObj = {0: [300, 200]};
var playerXYCoordinates = [0];


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

var collisionCheck = function() {
  var playerX = playerXYCoordinatesObj[0][0];
  var playerY = playerXYCoordinatesObj[0][1];
  var enemyX;
  var enemyY;
  var threshold = 25; // player radius + enemy radius

  for (var i = 0; i < enemyCount; i++) {
    enemyX = d3.select(d3.selectAll('.enemy')[0][i]).attr('cx');
    enemyY = d3.select(d3.selectAll('.enemy')[0][i]).attr('cy');

    if (Math.abs(playerX - enemyX) < threshold  &&
      Math.abs(playerY - enemyY) < threshold) {
      return true;
    }
  }

  return false;
};

// update function
var updateEnemies = function(enemyData) {
  // DATA JOIN
  var field = svg.selectAll('.enemy').data(enemyData);

  //UPDATE - enemies
  field.transition().duration(1000)
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

    collisionCheck();
};

// inital display
updateEnemies(enemyXYCoordinates);


// refresh display
setInterval(function(){
  for (var i = 0; i < enemyCount; i++) {
    enemyXYCoordinatesObj[i] = getCoordinates();
  }
  updateEnemies(enemyXYCoordinates);
},  refreshRateEnemy);



var updatePlayer = function(playerData) {
  // DATA JOIN
  var player = svg.selectAll('.player').data(playerData);

  //UPDATE - player
  player.transition().duration(10)
    .attr('cx', function(d){
      return playerXYCoordinatesObj[d][0];
    })
    .attr('cy', function(d){
      return playerXYCoordinatesObj[d][1];
    });

  // ENTER - create player
  player.enter()
    .append('circle')
    .attr('class', 'player')
    .attr('cx', 300)
    .attr('cy', 200)
    .attr('r', 15)
    .style('fill', 'pink')
    .call(d3.behavior.drag()
    .on("drag", function(d) {
      playerXYCoordinatesObj[0][0]+= d3.event.dx;
      playerXYCoordinatesObj[0][1]+= d3.event.dy;
    }));

    collisionCheck();

};

// inital display
updatePlayer(playerXYCoordinates);


// refresh display
setInterval(function(){
  updatePlayer(playerXYCoordinates);
  collisionCheck();
},  refreshRatePlayer);

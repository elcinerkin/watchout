// start slingin' some d3 here.

// data - might be array of coordinates of enemies
var width = 600; // width of SVG element
var height = 400; // height of SVG element
var xOffset = '320px'; // width offset of SVG element from top-left of screen
var yOffset = '200px'; // width offset of SVG element from top-left of screen
var enemyCount = 10;
var refreshRateEnemy = 1500;
var refreshRatePlayer = 10;
var refreshRateScore = 1000;
var currentScore = 0;
var highScore = 0;
var collisions = 0;
var count = 0;

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
  .attr('width', width);

var collisionCheck = function() {
  var playerX = playerXYCoordinatesObj[0][0];
  var playerY = playerXYCoordinatesObj[0][1];
  var enemyX;
  var enemyY;
  var threshold = 25; // player radius + enemy radius

  for (var i = 0; i < enemyCount; i++) {
    enemyX = d3.select(d3.selectAll('.enemy')[0][i]).attr('x');
    enemyY = d3.select(d3.selectAll('.enemy')[0][i]).attr('y');

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

  // UPDATE - enemies
  field.transition().duration(1000)
    .attr('x',  function(d) {
      return enemyXYCoordinatesObj[d][0];
    })
    .attr('y', function(d) {
      return enemyXYCoordinatesObj[d][1];
    })
    .attr('transform', function(){

    });

  // ENTER - create enemies (as a circle)
  // field.enter()
  //   .append('circle')
  //   .attr('class', 'enemy')
  //   .attr('cx', function(d) {
  //     return enemyXYCoordinatesObj[d][0];
  //   })
  //   .attr('cy', function(d) {
  //     return enemyXYCoordinatesObj[d][1];
  //   })
  //   .attr('r', 10);

    field.enter()
    .append('image')
    .attr('class', 'enemy')
    .attr('x', function(d) {
      return enemyXYCoordinatesObj[d][0];
    })
    .attr('y', function(d) {
      return enemyXYCoordinatesObj[d][1];
    })
    .attr('width', 50)
    .attr('height', 50)
    .attr('xlink:href', 'fireball.png');
};

// inital enemy display
updateEnemies(enemyXYCoordinates);


// refresh enemy display
setInterval(function(){
  for (var i = 0; i < enemyCount; i++) {
    enemyXYCoordinatesObj[i] = getCoordinates();
  }
  updateEnemies(enemyXYCoordinates);
},  refreshRateEnemy);



var updatePlayer = function(playerData) {
  // DATA JOIN
  var player = svg.selectAll('.player').data(playerData);

  // UPDATE - player
  player.transition().duration(10)
    .attr('x', function(d){
      return playerXYCoordinatesObj[d][0];
    })
    .attr('y', function(d){
      return playerXYCoordinatesObj[d][1];
    });

  // ENTER - create player
  player.enter()
    .append('image')
    .attr('class', 'player')
    .attr('x', function(d) {
      return playerXYCoordinatesObj[d][0];
    })
    .attr('y', function(d) {
      return playerXYCoordinatesObj[d][1];
    })
    .attr('width', 100)
    .attr('height', 150)
    .attr('xlink:href', 'zuko.png')
    .call(d3.behavior.drag()
    .on("drag", function(d) {
      playerXYCoordinatesObj[0][0]+= d3.event.dx;
      playerXYCoordinatesObj[0][1]+= d3.event.dy;
    }));

};

// inital player display
updatePlayer(playerXYCoordinates);


// refresh player display, rotating enemies, and check collisions
setInterval(function(){
  count++;
  if (count > 360) {
    count = 0;
  }

  updatePlayer(playerXYCoordinates);
  if(collisionCheck()) {
    collisions++;
    currentScore = 0;
  }
  d3.select('.collisions').text(collisions);
  d3.selectAll('.enemy').attr('transform', function(d) {
    return 'rotate(' + count + ',' +
      enemyXYCoordinatesObj[d][0] + ',' + enemyXYCoordinatesObj[d][1] + ')';
  });
},  refreshRatePlayer);

// refresh score
setInterval(function() {
  currentScore++;
  highScore = Math.max(currentScore, highScore);
  d3.select('.current').text(currentScore);
  d3.select('.high').text(highScore);
}, refreshRateScore);

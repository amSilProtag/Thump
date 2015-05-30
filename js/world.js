

function World () {
  this.actors = [];
  this.frequencies = [];
  // let's have a range of C3 to C5, so 25 pitches from x to 4x
  var startingPitch = 130.81; // c3
  var currentPitch = startingPitch;
  for (var i = 0;i<25;i++) {
    this.frequencies.push(0.5 * currentPitch / startingPitch );
    currentPitch = currentPitch * 1.05946;
    // then let's translate these frequencies visually to 0.5s .. 2.0s
    
  }
}

World.prototype.getDistance = function(x1,x2,y1,y2) {
  return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2,2));
};

World.prototype.createPlayer = function () {
  var player = new Player();
  this.actors.push(player);
};

// impelement map object...
World.prototype.loadMap = function () {
  for (var i = 0; i < 5; i++) {
    var obj = new Actor();
    obj.setCoords (Math.random() * 350+20, Math.random()*300+20);
    this.actors.push(obj);
  }
  
}

World.prototype.update = function () {
  for (var i = 0;i<this.actors.length;i++)
    this.actors[i].update();
  window.requestAnimationFrame(this.update.bind(this));
};
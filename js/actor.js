function Actor () {

  this.readout = svg.append("text")
                    .attr("x", "20px")
                    .attr("y", "20px");
  /*this.readout2 = svg.append("text")
                    .attr("x", "200px")
                    .attr("y", "230px");*/
  this.frequencyStates = world.frequencies;
  this.followableActors = world.actors;
  
  this.speed = 2;
  this.fracSpeed = 0.01;
  this.x = 50;
  this.y = 50;
  this.destX = this.x;
  this.destY = this.y;
  //this.frequencyState = 0;
  this.frequencyState = Math.floor(Math.random()*this.frequencyStates.length);
  this.currentFraction = 0;
  this.lastTime = Date.now();
  
  this.followState = 0;
  this.fillColors = ["#000", "#888", "#aaa", "#444" ];
  
  this.init();
  this.element = svg.append("circle")
    .attr("cx", "40")
    .attr("cy", "40")
    .attr("r", "40")
    .attr("fill", this.fillColors[0]);
  //console.log(this.frequencyStates[this.frequencyState]);
}

Actor.prototype.init = function () {
}

Actor.prototype.setCoords = function (px, py) {
  this.x = px;
  this.y = py;
  this.destX = this.x;
  this.destY = this.y;
};

Actor.prototype.update = function () {
  this.handleMovement();
  this.checkFollowables();
  
  var change = Date.now() - this.lastTime;
  this.lastTime = Date.now();
  this.currentFraction += this.frequencyStates[this.frequencyState] * change / 1000;
  if (this.currentFraction > 1)
    this.currentFraction--;
  currentDistance = this.currentFraction * Math.PI * 2;
  var currentRadius = Math.sin( currentDistance ) * 4 + 30;
  this.element.attr("r", currentRadius);
  this.element.attr("cx", this.x);
  this.element.attr("cy", this.y);
  this.element.attr("fill", this.fillColors[this.followState]);
  //this.readout.text(this.currentFraction.toString())
};

Actor.prototype.handleMovement = function () {
  var dist = world.getDistance(this.x, this.destX.x, this.y, this.destY);
  if (dist < 5)
    return;
  
  var targetAngle = Math.atan2(this.destY-this.y, this.destX-this.x);
  
  this.x += Math.cos(targetAngle)*this.speed;
  this.y += Math.sin(targetAngle)*this.speed;
};

Actor.prototype.checkFollowables = function () {
  this.followState = 0;
  for (var i = 0;i<this.followableActors.length;i++) {
    var a = this.followableActors[i];
    if (a === this)
      continue;
    if (world.getDistance(this.x, a.x, this.y, a.y) < 50)
    {
      this.followState = 1;
      if (Math.abs(this.frequencyState-a.frequencyState) < 3) {
        // have "this" get closer to "a"
        this.followState = 2;
        if (this.frequencyState < a.frequencyState) {
          this.frequencyState++;
        } else if (this.frequencyState > a.frequencyState) {
          this.frequencyState--;
        }
        var fracDistance = this.currentFraction - a.currentFraction;
        if (fracDistance < -0.5)
          fracDistance += 1;
        if (fracDistance > 0.5)
          fracDistance -= 1;
        if (fracDistance < 0)
          this.currentFraction += this.fracSpeed;
        if (fracDistance > 0)
          this.currentFraction -= this.fracSpeed;
        //this.readout.text(fracDistance.toString());
      }
    }
  }
};

Actor.prototype.changeFrequencyBy = function(pChange) {
  
  this.frequencyState += pChange;
  if (this.frequencyState < 0)
    this.frequencyState = 0;
  if (this.frequencyState >= this.frequencyStates.length)
    this.frequencyState = this.frequencyStates.length-1;
  //console.log("chagned Freq to" + this.frequencyState);
};


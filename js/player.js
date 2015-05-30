
function Player () {
  Actor.call(this);
}

Player.prototype = Object.create(Actor.prototype);

Player.prototype.init = function () {
  this.trackKeys();
  this.trackMouse();
}

Player.prototype.checkFollowables = function () {
  // player doesn't follow..
};

Player.prototype.trackKeys = function () {
  function handler(event) {
    console.log("hi");
    if (event.keyCode == 37)
      this.changeFrequencyBy(-1);
    if (event.keyCode == 39)
      this.changeFrequencyBy(1);
  }
  
  addEventListener("keydown", handler.bind(this));
};

Player.prototype.trackMouse = function () {
  function handler(event) {
    this.destX = event.clientX;
    this.destY = event.clientY;
  }
  addEventListener("mousemove", handler.bind(this));
};






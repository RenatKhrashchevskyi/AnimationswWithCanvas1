// let keyNames = {
//   32: 'space',
//   37: 'left',
//   38: 'up',
//   39: 'right',
//   40: 'down',
//   16: 'shift',
//   13: 'return',
//   18: 'option'
// };


// $('body').keydown(function (event) {
//   console.log(keyNames[event.keyCode]);
// });


//Control the ball with the keyboard
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;


// circle function

let circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.fillStyle = 'Red';
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};


//Creating a Ball constructor


let Ball = function () {
  this.x = width / 2;
  this.y = height / 2;
  this.speed = 5;
  this.size = 10;
  this.xSpeed = 1;
  this.ySpeed = 0;
  


};

//move method

Ball.prototype.move = function () {
  this.x += this.xSpeed * this.speed;
  this.y += this.ySpeed * this.speed;

  if (this.x < 0 || this.x > width) {
    this.xSpeed = -this.xSpeed
  } else if (this.y < 0 || this.y > height) {
    this.ySpeed = -this.ySpeed
  }
};

Ball.prototype.draw = function () {
  circle(this.x, this.y, this.size, true);
};

Ball.prototype.doAction = function (action) {
  if (action === 'up') {
    this.xSpeed = 0;
    this.ySpeed = -1;
  } else if (action === 'down') {
    this.xSpeed = 0;
    this.ySpeed = 1;
  } else if (action === 'left') {
    this.xSpeed = -1;
    this.ySpeed = 0;
  } else if (action === 'right') {
    this.xSpeed = 1;
    this.ySpeed = 0;
  } else if (action === 'stop') {
    this.xSpeed = 0;
    this.ySpeed = 0;
  } else if (action === 'fast') {
    this.speed++;
  } else if (action === 'slow') {
    if (this.speed > 0) {
      this.speed--;
    }
  } else if (action === 'smaller') {
    if (this.size > 0) {
      this.size--;
    }
  } else if (action === 'bigger') {
    this.size++;
  }
};

//new ball speed
Ball.prototype.setSpeed = function (newSpeed) {
  if (newSpeed !== undefined) {
    this.speed = newSpeed;
  }
};

let ball = new Ball();

let keyActions = {
  32: 'stop',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  88: 'fast',
  90: 'slow',
  67: 'smaller',
  86: 'bigger'
};


$('body').keydown(function (event) {
  let action = keyActions[event.keyCode];
  ball.doAction(action);
 
});


//Ball animation
setInterval(function () {
  ctx.clearRect(0, 0, width, height);
  ball.draw();
  ball.move();
  ctx.strokeRect(0, 0, width, height);
}, 30);

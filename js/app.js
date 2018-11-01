// Enemies our player must avoid
const Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y + 55;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
  this.step = 101;
  this.boundary = this.step * 5;
  this.resetPos = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < this.boundary) {

    // Move Forward
    // Increment x by speed * dt
    this.x += this.speed * dt;

  } else {

    // reset to orginal position
    this.x = this.resetPos;
  }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.step = 101;
    this.jump = 83;
    this.startX = (this.step * 2);
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
  }
  // Draw the Hero on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // handles the movement on the board
  handleInput(input) {
    switch (input) {
      case 'left':
        if (this.x > 0) {
          this.x -= this.step;
        }
        break;
      case 'up':
        if (this.y > 0) {
          this.y -= this.jump;
        }
        break;
      case 'right':
        if (this.x < this.step * 4) {
          this.x += this.step;
          break;
        }
      case 'down':
        if (this.y < this.jump * 4) {
          this.y += this.jump;
        }
        break;
      default:
    }
  }

  update() {
    //Check for collision here
    for (let enemy of allEnemies) {

      //Did the player and enemy crash
      if (this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x && enemy.x < this.x + this.step / 2)) {
        this.reset();
      }
    }
    //Check for win.
    // did player reach the water?
    if (this.y < 55) {
      this.victory = true;
    }
  }

  //Reset Player
  reset() {
    //set x and y for start
    this.x = this.startX;
    this.y = this.startY;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const bug1 = new Enemy(-101 * 2.2, 0, 400);
const bug2 = new Enemy(-101, 83, 150);
const bug3 = new Enemy((-101 * 4), 83, 300);
const bug4 = new Enemy((-101 * 3), 166, 200);

// Groups all the enemies into one array
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);


// Creates a player from the class Hero
const player = new Hero();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

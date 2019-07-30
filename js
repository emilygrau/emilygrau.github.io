
// globals 
var canvas;
var context;

const SNAKE_SIZE = 10;
const MAX_DOTS = 1600;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 400;
const C_WIDTH = 400;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(MAX_DOTS);
var y = new Array(MAX_DOTS);

var snakeHaead;
var score = 0;
var seg = 1;;
var food_x;
var food_y;

var left = false;
var right = false;
var up = false;
var down = false;
var gamePlay = true;

let dir;

let snake = [];
snake[0] = {
	x: 9 * SNAKE_SIZE,
	y: 10 * SNAKE_SIZE
};

let food = {
	x: Math.floor(Math.random()*17+1)*SNAKE_SIZE,
	y: Math.floor(Math.random()*15+3)*SNAKE_SIZE
}


canvas = document.getElementById("gameCanvas");
context = canvas.getContext("2d");
context.fillStyle = "black";
context.fillRect(0,0, canvas.width, canvas.height);

document.addEventListener("keydown", direction);

function direction(){
	let key = event.keyCode;
	if (key == LEFT_KEY && dir != "RIGHT"){
		dir = "LEFT";
	} else if (key == RIGHT_KEY && dir != "LEFT") {
		dir = "RIGHT";
	} else if (key == UP_KEY && dir != "DOWN") {
		dir = "UP";
	} else if (key == DOWN_KEY && dir != "UP") {
		dir = "DOWN";
	}
}

function collision (head, array) {
	for (let i = 0; i < array.length; i++) {
		if (head.x == array[i].x && head.y == array[i].y) {
			return true;
		}
	}
	return false;
}

function drawSnake() {
	context.fillStyle = "black";
	context.fillRect(0,0, canvas.width, canvas.height);
	//console.log(snake.length);
	for (let i = 0; i < snake.length; i++) {
		context.fillStyle = "pink";
		context.fillRect(snake[i].x, snake[i].y, SNAKE_SIZE, SNAKE_SIZE);
	}

	// Draw food
	context.fillStyle = "orange";
	context.fillRect(food.x, food.y, SNAKE_SIZE, SNAKE_SIZE);

	// Old position of snake head 
	let snakeHeadX = snake[0].x;
	let snakeHeadY = snake[0].y;

	// Update based on direction
	if (dir == "LEFT") snakeHeadX -= SNAKE_SIZE;
	if (dir == "UP") snakeHeadY -= SNAKE_SIZE;
	if (dir == "RIGHT") snakeHeadX += SNAKE_SIZE;
	if (dir == "DOWN") snakeHeadY += SNAKE_SIZE;

	// Eat food 
	if (snakeHeadX == food.x && snakeHeadY == food.y) {
		score++;
		//snake.unshift();
		// Regenerate food
		food = {
			x: Math.floor(Math.random()*17+1)*SNAKE_SIZE,
			y: Math.floor(Math.random()*15+3)*SNAKE_SIZE
		}
	} else {
		snake.pop();
	}

	let newHead = { 
		x : snakeHeadX,
		y : snakeHeadY
	}
	context.fillStyle = "black";
	//context.fillRect(snake[0].x, snake[0].y, SNAKE_SIZE, SNAKE_SIZE);

	// Game Over
	if (snakeHeadX > C_WIDTH || snakeHeadX < 0 ||
		snakeHeadY < 0 || snakeHeadY > C_HEIGHT || collision(newHead, snake)) {
		clearInterval(game);
		console.log("Game over! Score: " + score + "\nRefresh for new game.")

	}

	snake.unshift(newHead);

	/*
	context.fillStyle = "white";
    context.font = "45px Changa one";
    context.fillText(score,2*32,1.6*32); */

}

let game = setInterval(drawSnake, 100);

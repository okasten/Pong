var leftPaddle
var rightPaddle
var ball
var keyLeft
var index

function preload(){

}

function setup() {
	createCanvas(windowWidth/2, windowHeight/1.7);
	leftPaddle = new Paddle()
	rightPaddle = new Paddle()
	ball = new Ball(leftPaddle, rightPaddle)
	index = new Index()

}

function draw() {
	background(000)
	leftPaddle.showPadLeft()
	rightPaddle.showPadRight()
	// leftPaddle.moveLeftPaddle()
	// rightPaddle.moveRightPaddle()
	leftPaddle.stopLeftPaddle()
	rightPaddle.stopRightPaddle()
	ball.showBall()
	ball.moveBall()
	// frameRate(10)
	for(let i = 0; i < leftPaddle.movingLeft.length; i++){
		leftPaddle.moveLeftPaddle(leftPaddle.movingLeft[i])
	}
	for(let i = 0; i < rightPaddle.movingRight.length; i++){
		rightPaddle.moveRightPaddle(rightPaddle.movingRight[i])
	}

}

function keyReleased(){
	if(keyCode === 68 || keyCode === 69){
		leftPaddle.movingLeft = [0]
		leftPaddle.moveLeftPaddle(0)

	} else if (keyCode === UP_ARROW || keyCode === DOWN_ARROW){
		rightPaddle.movingRight = [0]
		rightPaddle.moveRightPaddle(0)


		// leftPaddle.movingLeft.slice(0, leftPaddle.movingLeft.length)
	}



}

function keyPressed(){
	if (keyCode === 69){
		leftPaddle.setLeftPaddle(-1)
	} else if (keyCode === 68){
		leftPaddle.setLeftPaddle(1)
	}
	if (keyCode === UP_ARROW){
		rightPaddle.setRightPaddle(-1)
	} else if (keyCode === DOWN_ARROW){
		rightPaddle.setRightPaddle(1)
	}

}

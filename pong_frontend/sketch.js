var leftPaddle
var rightPaddle
var ball

function setup() {
	createCanvas(windowWidth*.7, windowHeight/2);
	leftPaddle = new Paddle()
	rightPaddle = new Paddle()
	ball = new Ball(leftPaddle, rightPaddle)

}

function draw() {
	background(000)
	leftPaddle.showPadLeft()
	rightPaddle.showPadRight()
	leftPaddle.moveLeftPaddle()
	rightPaddle.moveRightPaddle()
	leftPaddle.stopLeftPaddle()
	rightPaddle.stopRightPaddle()
	ball.showBall()
	ball.moveBall()


}

function keyReleased(){
	leftPaddle.setLeftPaddle(0)
	rightPaddle.setRightPaddle(0)
}

function keyPressed(){
	if (keyCode === 69){
		leftPaddle.setLeftPaddle(-1)
	} else if (keyCode === 68){
		leftPaddle.setLeftPaddle(1)
	} else if (keyCode === UP_ARROW){
		rightPaddle.setRightPaddle(-1)
	} else if (keyCode === DOWN_ARROW){
		rightPaddle.setRightPaddle(1)
	}

}

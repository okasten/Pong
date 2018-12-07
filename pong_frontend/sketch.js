var leftPaddle
var rightPaddle
var ball
var keyLeft
var index
var scorecard
// var p5 = require(['libraries/p5'])

function preload(){

}

function setup() {
	let ctx = createCanvas(windowWidth/2, windowHeight/1.7);
	leftPaddle = new Paddle()
	rightPaddle = new Paddle()
	scorecard = new Scorecard()
	ball = new Ball(scorecard, leftPaddle, rightPaddle)
	index = new Index(leftPaddle, rightPaddle, ball, scorecard)


}

// window.module = window.module || {}
// module.exports = new p5(function () {
// 	this.setup = setup()
// })


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
	// rightPaddle.aiPlayer(ball, PLAYER_CONFIG.rightPaddle)
	// leftPaddle.aiPlayer(ball, PLAYER_CONFIG.leftPaddle)
	rightPaddle.aiPlayer(ball, PLAYER_ONE)
	leftPaddle.aiPlayer(ball, PLAYER_TWO)
	ball.receingIndex(index)
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
	if (key === " "){
		setup()
	}

}

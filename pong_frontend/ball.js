function Ball(leftPaddle, rightPaddle){
  console.log(leftPaddle, rightPaddle)
  this.x = width/2
  this.y = height/2
  this.radius = 10
  this.xspeed = -5
  this.yspeed = 4

  this.showBall = (e => {
    ellipse(this.x, this.y, this.radius*2, this.radius*2)
  })

  this.moveBall = (e => {
    this.x += this.xspeed
    this.y += this.yspeed

    if(this.y <= this.radius){
      this.yspeed *= -1
    } else if(this.y + this.radius >= height){
      this.yspeed *=-1
    } else if(this.x >= leftPaddle.padleftx && this.x <= leftPaddle.padleftx + leftPaddle.padwidth+2 && this.y >= leftPaddle.padlefty-35 && this.y <= leftPaddle.padlefty+25){
      this.xspeed *= -1
    } else if(this.x >= rightPaddle.padrightx && this.x <= rightPaddle.padrightx + rightPaddle.padwidth+2 && this.y >= rightPaddle.padrighty-35 && this.y <= rightPaddle.padrighty+25){
      this.xspeed *= -1
    }
  })

  // if(ellx >= rectx && ellx <= rectx+rectw+2 && elly >= recty-25 && elly <= recty+15){
  // 	yspeed*=-1;
  // 	xspeed*=-1;
  // }


}

function Paddle(){

  this.padleftx = 15
  this.padlefty = 50

  this.padrightx = width - 15
  this.padrighty = 50

  this.padwidth = 5
  this.padheight = 80

  this.yDirectionLeft = 0
  this.yDirectionRight = 0

  this.movingLeft = []
  this.movingRight = []

  this.aiSpeed = 6;


  this.showPadLeft = (e => {
    fill(255, 255, 255)
    rectMode(CENTER)
    rect(this.padleftx, this.padlefty, this.padwidth, this.padheight)

  })

  this.showPadRight = (e => {
    fill(255, 255, 255)
    rectMode(CENTER)
    rect(this.padrightx, this.padrighty, this.padwidth, this.padheight)
  })

  this.setLeftPaddle = (direction => {
    this.movingLeft.push(this.yDirectionLeft = direction)

  })

  this.moveLeftPaddle = (direction => {
    this.padlefty += direction * 10
  })

  this.setRightPaddle = (direction => {
    this.movingRight.push(this.yDirectionRight = direction)
  })

  this.moveRightPaddle = (direction => {
    this.padrighty += direction * 10
  })

  this.stopLeftPaddle = (e => {
    // if(this.padlefty + this.padheight/2 >= height){
    //   this.padlefty = height - this.padheight/2 -10
    // } else if (this.padlefty - this.padheight/2 <= 0){
    //   this.padlefty = this.padheight/2
    // }
    this.padlefty = constrain(this.padlefty, this.padheight/2, height - this.padheight/2)
  })

  this.stopRightPaddle = (e => {
    if(this.padrighty + this.padheight/2 >= height){
      this.padrighty = height - this.padheight/2
    } else if (this.padrighty - this.padheight/2 <= 0){
      this.padrighty = this.padheight/2
    }
  })

  this.aiPlayer = ((ball,aiPlayer)=>{
    if(aiPlayer){
      if(ball.x >= width/2){
        if(ball.y < this.padrighty){
          this.padrighty -= this.aiSpeed
        }else if(ball.y > this.padrighty){
          this.padrighty += this.aiSpeed
        }
      }
      if(ball.x <= width/2){
        if(ball.y < this.padlefty){
          this.padlefty -= this.aiSpeed
        }else if(ball.y > this.padlefty){
          this.padlefty += this.aiSpeed
        }
      }
    }
  })


  this.aiPlayerLeft = ((ball,aiPlayer)=>{
    if(aiPlayer){
      if(ball.x <= width/2){
        if(ball.y < this.padlefty){
          this.padlefty -= this.aiSpeedLeft
        }else if(ball.y > this.padlefty){
          this.padlefty += this.aiSpeedLeft
        }
      }
    }
  })


}

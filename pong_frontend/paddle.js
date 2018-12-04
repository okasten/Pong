function Paddle(){
  this.padleftx = 15
  this.padlefty = 50

  this.padrightx = width - 15
  this.padrighty = 50

  this.padwidth = 10
  this.padheight = 70

  this.yDirectionLeft = 0
  this.yDirectionRight = 0




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
    this.yDirectionLeft = direction
  })

  this.moveLeftPaddle = (direction => {
    this.padlefty += this.yDirectionLeft * 8
  })

  this.setRightPaddle = (direction => {
    this.yDirectionRight = direction
  })

  this.moveRightPaddle = (direction => {
    this.padrighty += this.yDirectionRight * 8
  })

  this.stopLeftPaddle = (e => {
    if(this.padlefty + this.padheight/2 >= height){
      this.padlefty = height - this.padheight/2
    } else if (this.padlefty - this.padheight/2 <= 0){
      this.padlefty = this.padheight/2
    }
  })

  this.stopRightPaddle = (e => {
    if(this.padrighty + this.padheight/2 >= height){
      this.padrighty = height - this.padheight/2
    } else if (this.padrighty - this.padheight/2 <= 0){
      this.padrighty = this.padheight/2
    }
  })

}

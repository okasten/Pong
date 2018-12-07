function Ball(scorecard, leftPaddle, rightPaddle){

  this.x = width/2
  this.y = height/2
  this.radius = 10
  this.xspeed = 7
  this.yspeed = 6

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
    } else if(this.x > rightPaddle.padrightx || this.x < leftPaddle.padleftx){
        let ballposition = this.x
        this.x = width/2

        scoreKeeper(ballposition)

    }
  })

  function scoreKeeper(xvalue){

    if(xvalue > width/2){

      if(document.getElementById('player2score') != null){
        let player2score = document.getElementById('player2score').innerText
        if(parseInt(player2score) < 15){
            document.getElementById('player2score').innerText = `${parseInt(++player2score)}`
        } else {

        }
      }

    } else{
      if(document.getElementById('player1score') != null){
        let player1score = document.getElementById('player1score').innerText
        if(parseInt(player1score) < 15){
          document.getElementById('player1score').innerText = `${parseInt(++player1score)}`
        } else {

          let data = document.getElementById('player1score').dataset
          let player2score = document.getElementById('player2score').innerText
          postScore(data, parseInt(player1score), parseInt(player2score))
        }
      }
    }
  }

  this.receingIndex = (e =>{
    debugger
  })

  function postScore(playerData, player1score, player2score){
    let data = {ballspeed: 8, winner: playerData.username, p1_score: player1score, p2_score: player2score, points_to_win: 15}
    fetch(`http://localhost:3000/games`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }).then(console.log)

  }

  function breakhere(event) {


  }


  // if(ellx >= rectx && ellx <= rectx+rectw+2 && elly >= recty-25 && elly <= recty+15){
  // 	yspeed*=-1;
  // 	xspeed*=-1;
  // }


}

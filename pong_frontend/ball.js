
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
        if(parseInt(player2score) < 5){
            document.getElementById('player2score').innerText = `${parseInt(++player2score)}`
        } else {

          let data = document.getElementById('player1score').dataset
          let player2score = document.getElementById('player2score').innerText
          let playerOneScore = document.getElementById('player1score').innerText
          document.getElementById('player1score').innerText = 0
          document.getElementById('player2score').innerText = 0
          postScore(data, parseInt(playerOneScore), parseInt(player2score))

        }
      }

    } else{
      if(document.getElementById('player1score') != null){
        let player1score = document.getElementById('player1score').innerText
        if(parseInt(player1score) < 5){
          document.getElementById('player1score').innerText = `${parseInt(++player1score)}`
        } else {

          let data = document.getElementById('player1score').dataset
          let player2score = document.getElementById('player2score').innerText
          let playerOneScore = document.getElementById('player1score').innerText
          document.getElementById('player1score').innerText = 0
          document.getElementById('player2score').innerText = 0
          postScore(data, parseInt(playerOneScore), parseInt(player2score))
        }
      }
    }
  }

  function postScore(playerData, player1score, player2score){
    let data = {ballspeed: 8, winner: playerData.username, p1_score: player1score, p2_score: player2score, points_to_win: 15}
    fetch(`http://localhost:3000/games`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then(e => updateGames(e, playerData.id))

  }

  function updateGames(event, playerId) {
    let leaderboardButton = document.getElementById('leaderboard')
    leaderboardButton.click()
    let data = {game_id: event.id, player_id: playerId}
    playerGamesWon(playerId).then((e)=>{

      let playerWinScore= e.games_won
      let newScore = parseInt(++playerWinScore)
      let playerLossScore = e.games_lost
      let lossScore = parseInt(++playerLossScore)

    fetch(`http://localhost:3000/players/${playerId}`, {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        "games_won": newScore
      })
    }).then(res => res.json())

    fetch("http://localhost:3000/player_games", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())

  })
  }

  function playerGamesWon(id){
    return fetch(`http://localhost:3000/players/${id}`)
    .then(response => response.json())
  }



  // if(ellx >= rectx && ellx <= rectx+rectw+2 && elly >= recty-25 && elly <= recty+15){
  // 	yspeed*=-1;
  // 	xspeed*=-1;
  // }


}

function Scorecard(){

  this.addScoreCard = (e => {
    let scorediv = `<div class="scorecard" id="scorekeeper" data-id="${e.id}"></div>`

    document.getElementById('scorekeeper').innerHTML = scorediv
  // })
  //
  // this.addScoreBoard = (e => {
    let container = document.getElementById('scorekeeper')

    let playerscores = `<h1>${e.name}: <span id="player1score" data-username="${e.username}" data-id="${e.id}" data-email="${e.email}"> 0 </span></h1>
                        <h1>Player 2: <span id="player2score"> 0 </span></h1>`
    container.innerHTML = playerscores
  })

}

function Scorecard(){

  this.addScoreCard = (e => {
    let scorediv = `<div class="scorecard" id="scorekeeper" data-id="${e.id}"></div>`
    let playerscores
    document.getElementById('scorekeeper').innerHTML = scorediv
    if(PLAYER_ONE === false && PLAYER_TWO === true){
      playerscores = `<h1 style="text-align: center; font-size: 30px; color: blue;">1 Player Mode</h1></br><hr>
      <h1 style="color: green; font-size: 40px; text-align: center; font-weight: bold;">${e.name}: <span id="player1score" data-username="${e.username}" data-id="${e.id}" data-email="${e.email}"> 0 </span>
       <span style="color: blue;"> | </span>
       <span>Computer: </span><span id="player2score"> 0 </span></h1>`
    } else if(PLAYER_ONE === false && PLAYER_TWO === false){
      playerscores = `<h1 style="text-align: center; font-size: 30px; color: blue;">2 Player Mode</h1></br><hr>
      <h1 style="color: green; font-size: 40px; text-align: center; font-weight: bold;">${e.name}: <span id="player1score" data-username="${e.username}" data-id="${e.id}" data-email="${e.email}"> 0 </span>
       <span style="color: blue;"> | </span>
       <span>Player 2: </span><span id="player2score"> 0 </span></h1>`
    }
  // })
  //
  // this.addScoreBoard = (e => {
    let container = document.getElementById('scorekeeper')

    // let playerscores = `<h1 style="color: green; font-size: 40px;">${e.name}: <span id="player1score" data-username="${e.username}" data-id="${e.id}" data-email="${e.email}"> 0 </span></h1>
    //                     <h1 style="color: green; font-size: 40px;">Player 2: <span id="player2score"> 0 </span></h1>`
    // let playerscores = `<h1 style="color: green; font-size: 40px;">${e.name}: <span id="player1score" data-username="${e.username}" data-id="${e.id}" data-email="${e.email}"> 0 </span></h1>`
    container.innerHTML = playerscores
  })

}

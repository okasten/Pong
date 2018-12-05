function Index(){

  this.grabCanvas = function(showing=false) {
    let canvas = document.getElementsByTagName('canvas')[0];
    console.log(canvas)
    if(!showing){
      canvas.style.display = "none";
    } else {
      canvas.style.display = "block";
    }
  }


  document.addEventListener('DOMContentLoaded', e =>{
    let canvas = document.getElementsByTagName('canvas')
    let container = document.getElementById('container')
    container.innerHTML = canvas

    // this.grabCanvas(false)
  })

  function reset(){
    document.getElementById('container-all').innerHTML = `<div class="sign-up"></div>
      <div class="log-in"></div>
      <div class="leaderboard" style="align: center;">
      </div>
      <div class="stats"></div>`
  }

  document.getElementById('home').addEventListener('click', e => {
    reset()
    this.grabCanvas(true)

  })

  document.getElementById('sign-up').addEventListener('click', e => {
    this.grabCanvas(false)
    reset()
    let newForm = `<form id="sign-up-form">
  <div class="container">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>

    <label for="email"><b>Email</b></label>
    <input id="sign-up-email" type="text" placeholder="Enter Email" name="email" required>

    <label for="username"><b>Username</b></label>
    <input id="sign-up-username" type="text" placeholder="Enter Username" name="username" required>

    <label for="name"><b>Name</b></label>
    <input id="sign-up-name" type="text" placeholder="Enter Name" name="name" required>
    <hr>

    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
    <button type="submit" class="registerbtn">Register</button>
  </div>

  <div class="container signin">
    <p>Already have an account? <a id="sign-in-again" href="#">Sign in</a>.</p>
  </div>
</form>`

    document.getElementsByClassName('sign-up')[0].innerHTML = newForm
    document.getElementById('sign-up-form').addEventListener('submit', e => {
      e.preventDefault()
      let email = document.getElementById('sign-up-email').value
      let username = document.getElementById('sign-up-username').value
      let name = document.getElementById('sign-up-name').value

      let data = {name: name, username: username, email: email, games_won: 0, games_lost: 0}
      fetchCreatePlayer(data)
    })
    document.getElementById('sign-in-again').addEventListener('click', e => {
      logIn()
    })

  })

  function fetchCreatePlayer(playerData){
    fetch("http://localhost:3000/players", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(playerData)
    })
    .then(response => response.json())
    .then(playerShowPage)
  }

  function playerShowPage(player){
    reset()
    document.getElementById('sign-up').remove()
    let logOut = document.getElementById('logIn')
    logOut.innerText = "Log Out"
    logOut.dataset.id = player.id
    let navbar = document.getElementById('navbarBasicExample')
    navbar.firstElementChild.innerHTML += `<a class="navbar-item" id="profile">
      Profile
    </a>`
    displayPlayer(player)
  }

  function displayPlayer(player){
    debugger
    let stats = document.getElementsByClassName('stats')[0]
    stats.innerHTML = `<table class="leaderTable" id="leaderTable" style="color:blue;">
      <th class="table-head">Games</th>
      <th class="table-head">Player Score</th>
      <th class="table-head">Opponent Score</th>
      <th class="table-head">Ballspeed</th>
      <th class="table-head">Game Length (Points)</th>
      <th class="table-head">Winner</th>
    </table>`

    for(game of player.games){
      debugger
      let row = stats.insertRow(-1)
      row.insertCell(0).innerHTML = counter++
      row.insertCell(1).innerHTML = game.p1_score
      row.insertCell(2).innerHTML = game.p2_score
      row.insertCell(3).innerHTML = game.ballspeed
      row.insertCell(4).innerHTML = game.points_to_win
      row.insertCell(5).innerHTML = game.winner

    }

  }

  document.getElementById('logIn').addEventListener('click', e => {
    reset()
    this.grabCanvas(false)
    logIn()

  })

  function logIn(){
    reset()
    const logInForm = `<form>
      <div class="container">
        <label for="uname"><b>Username</b></label>
        <input id="log-in-username" type="text" placeholder="Enter Username" name="username" required>

        <label for="email"><b>Email</b></label>
        <input id="log-in-email" type="text" placeholder="Enter Email" name="email" required>

        <button type="submit">Login</button>
        <label>
          <input type="checkbox" checked="checked" name="remember"> Remember me
        </label>
      </div>

      <div class="container">
        <button type="button" class="cancelbtn" id="cancel-btn">Cancel</button>
      </div>
    </form>`

    document.querySelector('.log-in').innerHTML = logInForm
    document.addEventListener('submit', e =>{
      e.preventDefault()
      logInUser(e)
    })
  }

  function logInUser(user){
    const username = document.getElementById('log-in-username').value
    const email = document.getElementById('log-in-email').value
    fetchSingleUser(username, email)
  }

  function fetchSingleUser(username, email){
    fetch(`http:localhost:3000/players?email=${email}&username=${username}`)
    .then(response => response.json())
    .then(console.log)
  }

  document.addEventListener('click', e => {
    if(e.target.id === 'cancel-btn'){
      reset()
      this.grabCanvas(true)
    }
  })

  document.getElementById('leaderboard').addEventListener('click', e => {
    reset()
    this.grabCanvas(false)
    getFullFetch()
  })

  function getFullFetch() {
    fetch("http://localhost:3000/players")
    .then(res => res.json())
    .then(displayLeaderBoards)
  }

  function displayLeaderBoards(players){
    let leaderboard = document.getElementsByClassName('leaderboard')[0]
    leaderboard.innerHTML = `<table class="leaderTable" id="leaderTable" style="color:blue;">
      <th class="table-head">Rank</th>
      <th class="table-head">Username</th>
      <th class="table-head">Win Percentage</th>
      <th class="table-head">Games Won</th>
      <th class="table-head">Games Lost</th>
    </table>`

    let leaderTable = document.getElementById('leaderTable')
    let sortedPlayers = players.sort(compare)
    let counter = 1
    for(player of sortedPlayers){
      let row = leaderTable.insertRow(-1)
      row.insertCell(0).innerHTML = counter++
      row.insertCell(1).innerHTML = player.username
      row.insertCell(2).innerHTML = `${Math.floor((player.games_won / (player.games_lost + player.games_won) * 100))}%`
      row.insertCell(3).innerHTML = player.games_won
      row.insertCell(4).innerHTML = player.games_lost

    }
  }

  function compare(a, b) {
    const scoreA = a.games_won - a.games_lost
    const scoreB = b.games_won - b.games_lost

    let comparison = 0;
    if (scoreA < scoreB) {
      comparison = 1;
    } else if (scoreA > scoreB) {
      comparison = -1;
    }
    return comparison;
  }



}

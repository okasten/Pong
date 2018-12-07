
function Index(leftPaddle, rightPaddle, ball, scorecard){
  const sketch = require(['sketch'])

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
    document.getElementById('container-all').innerHTML = `
      <div style="text-align: center;" id="welcome"></div>
      <div class="sign-up"></div>
      <div class="log-in"></div>
      <div class="leaderboard" style="align: center;">
      </div>
      <div class="stats"></div>
      <div class="scorecard" id="scorekeeper" data-id=" "></div>`
  }

  // document.getElementById('home').addEventListener('click', e => {
  //   reset()
  //   this.grabCanvas(true)
  //
  // })
  if(document.getElementById('sign-up') != null){
      document.getElementById('sign-up').addEventListener('click', e => {
        this.grabCanvas(false)
        reset()
        let newForm = `<form id="sign-up-form">
      <div class="container">
        <h1 style="color: white;">Register</h1>
        <p style="color: white;">Please fill in this form to create an account.</p>
        <hr>

        <label for="email"><b>Email</b></label>
        <input id="sign-up-email" type="text" placeholder="Enter Email" name="email" required>

        <label for="username"><b>Username</b></label>
        <input id="sign-up-username" type="text" placeholder="Enter Username" name="username" required>

        <label for="name"><b>Name</b></label>
        <input id="sign-up-name" type="text" placeholder="Enter Name" name="name" required>
        <hr>

        <p style="color: white;">By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
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
}

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
    if(player.games === null || player.games.length === 0 || player.games === undefined){
      reset()
      document.getElementsByClassName('stats')[0].innerHTML = `<h1>No Previously Played Games</h1>`
    } else {
      displayPlayer(player)
    }
    if(document.getElementById('sign-up') != null){document.getElementById('sign-up').remove()}
    let logOut = document.getElementById('logIn')
    logOut.innerText = "Log Out"
    logOut.dataset.id = player.id
    let navbar = document.getElementsByClassName('navbar-start')[0]
    navbar.lastElementChild.innerHTML = `<a class="navbar-item" data-email="${player.email}" data-username="${player.username}" id="profile" style="color: white;">
      Stats
    </a>
    <a class="navbar-item" data-email="${player.email}" data-name="${player.name}" data-username="${player.username}" data-id="${player.id}" id="editProfile" style="color: white;">
      Profile
    </a>
    <a class="navbar-link">
      Play Pong
    </a>

    <div class="navbar-dropdown">
      <a data-email="${player.email}" data-name="${player.name}" data-username="${player.username}" data-id="${player.id}" id="1player" class="navbar-item">
        1 Player
      </a>
      <a data-email="${player.email}" data-name="${player.name}" data-username="${player.username}" data-id="${player.id}" id="2player" class="navbar-item">
        2 Players
      </a>
    </div>`
  }

  function displayPlayer(player){
    reset()
    let stats = document.getElementsByClassName('stats')[0]
    stats.innerHTML = `<table class="leaderTable" id="leaderTable" style="color:blue;">
      <th class="table-head" style="color: white;">Games</th>
      <th class="table-head" style="color: white;">Player 1 score</th>
      <th class="table-head" style="color: white;">Player 2 Score</th>
      <th class="table-head" style="color: white;">Ballspeed</th>
      <th class="table-head" style="color: white;">Game Length (Points)</th>
      <th class="table-head" style="color: white;">Result</th>
    </table>`
    let counter = 1
    for(game of player.games){
      let row = stats.firstElementChild.insertRow(-1)
      row.insertCell(0).innerHTML = counter++
      row.insertCell(1).innerHTML = game.p1_score
      row.insertCell(2).innerHTML = game.p2_score
      row.insertCell(3).innerHTML = game.ballspeed
      row.insertCell(4).innerHTML = game.points_to_win
      row.insertCell(5).innerHTML = game.winner
    }


  }

  document.getElementById('logIn').addEventListener('click', e => {
    if(e.target.innerText === "Log In"){
      reset()
      this.grabCanvas(false)
      logIn()
    } else if(e.target.innerText === "Log Out"){
      reset()
      this.grabCanvas(true)
      logOutNavBar()
    }
  })

  function logOutNavBar(){
    let navbar = document.getElementById('navbarBasicExample')
    document.getElementById('profile').remove()
    navbar.lastElementChild.innerHTML = `<div class="navbar-item">
      <div class="buttons">
        <a class="button is-primary" id='sign-up'>
          <strong>Sign up</strong>
        </a>
        <a id="logIn" data-id=" " class="button is-light">
          Log In
        </a>
      </div>
    </div>`

    location.reload()
  }

  function logIn(){
    reset()
    const logInForm = `<form id="log_in_form" action="#show">
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
    document.getElementById('log_in_form').addEventListener('submit', e =>{
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
    fetch(`http:localhost:3000/players/${username}/${email}`)
    .then(response => response.json())
    .then(player => {
      if(player === null){
        document.getElementsByClassName('log-in')[0].nextElementSibling.innerHTML = `<h1 style="color:red; text-align: center;">Invalid username or email. Please try again or sign up. </h1>`
      } else {
        playerShowPage(player)
      }
    })
  }

  document.addEventListener('click', e => {
    if(e.target.id === 'cancel-btn'){
      reset()
      this.grabCanvas(true)
    }
  })

  document.addEventListener('click', e =>{

    if(e.target.id === "leaderboard"){
      reset()
      this.grabCanvas(false)
      getFullFetch()
    } else if(e.target.id === "home"){
      // debugger
      reset()
      document.getElementById('welcome').innerHTML = `<h1 style="padding-top: 30px; color: blue; font-weight: bolder; font-size: 50px;">Welcome to Pong!</h1>`

      PLAYER_ONE = true
      PLAYER_TWO = true
      this.grabCanvas(true)
    } else if(e.target.id === "profile"){
      this.grabCanvas(false)
      fetchSingleUser(e.target.dataset.username, e.target.dataset.email)
    } else if(e.target.id === "editProfile"){
      this.grabCanvas(false)
      reset()
      editProfilePage(e)
    } else if(e.target.id === "1player"){
      reset()
      this.grabCanvas(true)
      onePlayerMode(e)
    } else if(e.target.id === "2player"){
      reset()
      this.grabCanvas(true)
      twoPlayerMode(e)
    }
  })

  function onePlayerMode(e){

    // PLAYER_CONFIG.leftPaddle = true
    // PLAYER_CONFIG.rightPaddle = false
    PLAYER_ONE = false;
    PLAYER_TWO = true;
    scorecard.addScoreCard(e.target.dataset)

  }


  function twoPlayerMode(e){


    // PLAYER_CONFIG.leftPaddle = false
    // PLAYER_CONFIG.rightPaddle = false
    PLAYER_ONE = false;
    PLAYER_TWO = false;
    scorecard.addScoreCard(e.target.dataset)
  }

  // function start1player(){
  //
  //   let canvas = document.getElementById('defaultCanvas0')
  //
  // }

  function editProfilePage(player){
    let newForm = `<form id="edit-form">
      <div class="container">
        <h1 style="color: white;">Edit</h1>
        <hr>

        <label for="email"><b>Email</b></label>
        <input id="edit-email" type="text" value="${player.target.dataset.email}" name="email" required>

        <label for="username"><b>Username</b></label>
        <input id="edit-username" type="text" value="${player.target.dataset.username}" name="username" required>

        <label for="name"><b>Name</b></label>
        <input id="edit-name" type="text" value="${player.target.dataset.name}" name="name" required>
        <hr>

        <button type="submit" class="updatebtn">Update</button>
      </div>
      </form>`
    document.getElementsByClassName('sign-up')[0].innerHTML = newForm

    document.getElementById('edit-form').addEventListener('submit', e =>{
      e.preventDefault()
      playerUpdate(player.target.dataset)
    })
  }

  function playerUpdate(player){
    let name = document.getElementById('edit-name').value
    let username = document.getElementById('edit-username').value
    let email = document.getElementById('edit-email').value
    let id = player.id
    let playerInfo = {name: name, username: username, email: email}
    playerUpdateFetch(playerInfo, id)
  }

  function playerUpdateFetch(playerInfo, id){
    fetch(`http://localhost:3000/players/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerInfo)
    })
    .then(response => response.json())
    .then(playerShowPage)
  }


  function getFullFetch() {
    fetch("http://localhost:3000/players")
    .then(res => res.json())
    .then(displayLeaderBoards)
  }

  function displayLeaderBoards(players){
    let leaderboard = document.getElementsByClassName('leaderboard')[0]
    leaderboard.innerHTML = `<table class="leaderTable" id="leaderTable" style="color:blue;">
      <th class="table-head" style="color: white;">Rank</th>
      <th class="table-head" style="color: white;">Username</th>
      <th class="table-head" style="color: white;">Win Percentage</th>
      <th class="table-head" style="color: white;">Games Won</th>
      <th class="table-head" style="color: white;">Games Lost</th>
    </table>`

    let leaderTable = document.getElementById('leaderTable')
    let sortedPlayers = players.sort(compare)
    let counter = 1
    for(player of sortedPlayers){
      let percent = Math.floor((player.games_won / (player.games_lost + player.games_won) * 100))
      let row = leaderTable.insertRow(-1)
      row.insertCell(0).innerHTML = counter++
      row.insertCell(1).innerHTML = player.username
      row.insertCell(2).innerHTML = isNaN(percent) ? "0%" : `${percent}%`
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

(function () {
  //Game variable
  var alienX = Math.floor(Math.random() * 280);
  console.log(alienX);
  var alienY = 20;
  var guessX = 0;
  var guessY = 0;
  var shotsRemaining = 8;
  var shotsMade = 0;
  var gameStats = "";
  var gameWon = false;

  //The game objects
  var cannon = document.querySelector("#cannon");
  var alien = document.querySelector("#alien");
  
  var missile = document.querySelector("#missile");
  var explosion = document.querySelector("#explosion");
  alien.style.left = alienX + "px";
  //The input and output of the Game
  var inputX = document.querySelector("#inputX");
  var inputY = document.querySelector("#inputY");
  var output = document.querySelector("#output");

  //The button object and event
  var button = document.querySelector("button");
  button.style.display = "pointer";
  button.addEventListener("click", clickHandler, false);
  window.addEventListener("keydown", enterHandler, false);

  function enterHandler(event) {
    if (event.code === "Enter") {
      validateInput();
    }
  }

  //Handler function
  function clickHandler() {
    validateInput();
  }
  //Validate input
  function validateInput() {

    //assign to variable an object property (string) transformed in integer
    //with the aid of inbuild function parseInt
    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value);
    if (isNaN(guessX) || isNaN(guessY)) {
      output.innerHTML = "Please enter a number!";
    } else if (guessX < 0 || guessX > 300 || guessY < 0 || guessY > 300) {
      output.innerHTML = "Please enter a valid number between 0-300";
    } else {
      playGame();
    }
  }
  function playGame() {
    shotsRemaining = shotsRemaining - 1;
    shotsMade++;
    gameStats = "Shots: " + shotsMade + " | Remaining: " + shotsRemaining;
    //guessX = parseInt(inputX.value);
    //guessY = parseInt(inputY.value);

    //checking if the Alien ship was hit
    //if it's in the X range
    if (guessX >= alienX && guessX <= alienX + 20) {
      //yes, now check if it's in the Y range
      if (guessY >= alienY && guessY <= alienY + 20) {
        //It's a hit! end of GAME
        gameWon = true;
        endGame();
      }
    } else {
      output.innerHTML = "Miss!" + gameStats;
      if (shotsRemaining < 1) {
        endGame();
      }
    }

    if (!gameWon) {
      //random place on X axe
      alienX = Math.floor(Math.random() * 281);
      //alien advance 30px on Y axe towards the "Earth"
      alienY += 30;
    }
    render();
    console.log("X:" + alienX + "<br>Y:" + alienY);
  }
  
  function render() {
    //Positions to alien
    alien.style.left = alienX + "px";
    alien.style.top = alienY + "px";

    //Position to cannon
    cannon.style.left = guessX + "px";

    //Position missile
    missile.style.left = guessX + "px";
    missile.style.top = guessY + "px";

    if (gameWon) {
      explosion.style.display = "block";
      explosion.style.left = alienX + "px";
      explosion.style.top = alienY + "px";
      missile.style.display = "none";
      alien.style.display = "none";
      endGame();
    }
  }

  function endGame() {
    if (gameWon) {
      output.innerHTML =
        "Hit! You saved the earth!" +
        "<br>" +
        "It only took you " +
        shotsMade +
        " shots.";
    } else {
      output.innerHTML = "You lost!" + "<br>" + "The earth has been invaded!";
    }
    button.removeEventListener("click", clickHandler, false);
    window.removeEventListener("keydown", enterHandler, false);
    inputX.style.display = "none";
    inputY.style.display = "none";
    button.innerHTML = "Start";
    button.style.position = "relative";
    button.addEventListener("click", refreshPage, false);
    window.addEventListener("keydown", refreshPage, false);
  }

  function refreshPage() {
    window.location.reload();
  }
})();

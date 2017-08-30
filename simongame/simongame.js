var simonOn = false;  // Indicates if the simon game is on
var gameOn = false; // Indicates if a game is taking place
var strictOn = false; // Indicates if the game is in strict mode
var playerTurn = false; // Indicates if the player's turn to click is on
var playerClicks = [];  // The sequence of the player's clicks
var gameSequence = [];  // Determine the random sequence (array 1)
var iter = 0; // The number of iterations for the sequence
var sequenceTimer = null; // The interval for the sequence of computer clicks
var playerClickTimer = null;  // The timeout for the player click

// Turn off the onclick for the 4 buttons
document.getElementById('greenButton').style.pointerEvents = 'none';
document.getElementById('redButton').style.pointerEvents = 'none';
document.getElementById('yellowButton').style.pointerEvents = 'none';
document.getElementById('blueButton').style.pointerEvents = 'none';

// Generate a pattern of 20 random numbers in the range from 0 to 3
function genPattern() {
  var pattern = []; // The pattern of 20 numbers
  var num;  // The number
  
  // Push 20 random numbers (range 0-3) to the array
  for (var n = 0; n < 20; n++) {
    num = Math.round(Math.random() * 3);
    pattern.push(num);
  }
  
  // Return the array
  return pattern;
}

// Make sure the entered player sequence is the same as
// the computer sequence up to what was iterated
function checkPlayerSeq() {
  // Go through each player click
  for (var i = 0; i < playerClicks.length; i++) {
    // Return 0 if there was an incorrect entry
    if (playerClicks[i] !== gameSequence[i]) return 0;
  }
  
  // Return 1 if the player sequence was correct
  return 1;
}

// Make the 4 colored buttons unclickable by the player
function unclickableButtons() {
  document.getElementById('greenButton').style.pointerEvents = 'none';
  document.getElementById('redButton').style.pointerEvents = 'none';
  document.getElementById('yellowButton').style.pointerEvents = 'none';
  document.getElementById('blueButton').style.pointerEvents = 'none';
}

// Make the 4 colored buttons clickable by the player
function clickableButtons() {
  document.getElementById('greenButton').style.pointerEvents = 'auto';
  document.getElementById('redButton').style.pointerEvents = 'auto';
  document.getElementById('yellowButton').style.pointerEvents = 'auto';
  document.getElementById('blueButton').style.pointerEvents = 'auto';
}

// Plays a sound on clicking the button if the game is on
function clickButton(id) {
  if (simonOn && gameOn) {
    var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

    switch (id) {
      case "greenButton":
        document.getElementById('greenButton').style.backgroundColor = "#00FF00";
        greenSound.play();
        setTimeout(function() {
          document.getElementById('greenButton').style.backgroundColor = "#008800";
        }, 500);
        if (playerTurn) playerClicks.push(0);
        break;
      case "redButton":
        document.getElementById('redButton').style.backgroundColor = "#FF0000";
        redSound.play();
        setTimeout(function() {
          document.getElementById('redButton').style.backgroundColor = "#880000";
        }, 500);
        if (playerTurn) playerClicks.push(1);
        break;
      case "yellowButton":
        document.getElementById('yellowButton').style.backgroundColor = "#FFFF00";
        yellowSound.play();
        setTimeout(function() {
          document.getElementById('yellowButton').style.backgroundColor = "#888800";
        }, 500);
        if (playerTurn) playerClicks.push(2);
        break;
      case "blueButton":
        document.getElementById('blueButton').style.backgroundColor = "#0000FF";
        blueSound.play();
        setTimeout(function() {
          document.getElementById('blueButton').style.backgroundColor = "#000088";
        }, 500);
        if (playerTurn) playerClicks.push(3);
        break;
    }

    // Check if the player click matches the sequence
    if (playerTurn && playerClicks.length > 0) {
      var index = playerClicks.length - 1;
      
      // If one of the clicks doesn't match the sequence
      if (playerClicks[index] !== gameSequence[index]) {
        clearInterval(sequenceTimer);
        sequenceTimer = null;
        clearTimeout(playerClickTimer);
        playerClickTimer = null;
        unclickableButtons();
        playerClicks = [];
        playerTurn = false;
        
        var oldVal = document.getElementById('countnum').value;
        
        document.getElementById('countnum').value = "!!!!!!";
        document.getElementById('countnum').style.color = "#FF0000";
        
        setTimeout(function() {
          // If strict mode, start from the beginning
          if (strictOn) {
            iter = 0;
            gameSequence = genPattern();
            setTimeout(function() {
              document.getElementById('countnum').value = "01";
              document.getElementById('countnum').style.color = "#00FF00";
            }, 1000);
          } else {
            setTimeout(function() {
              document.getElementById('countnum').value = oldVal;
              document.getElementById('countnum').style.color = "#00FF00";
            }, 1000);
          }

          // Iterate the sequence
          if (iter < 20) iterateSimonSeq();
        }, 1000);
      }
      // If the end of the played sequence was reached and there were no errors
      else if (playerClicks.length === iter+1) {
        playerTurn = false;
        unclickableButtons();

        playerClicks = [];  // Clear the player input
        
        // If there are not 20 sounds yet
        if (Number(document.getElementById('countnum').value) < 20) {
          iter++;

          // Increment the count
          setTimeout(function() {
            var newCount = Number(document.getElementById('countnum').value) + 1;
            document.getElementById('countnum').value = "";
            if (newCount < 10 && String(newCount).length < 2) newCount = "0" + String(newCount);
            document.getElementById('countnum').value = String(newCount);
          }, 1000);

          // Continue playing the game until twenty sounds have been played
          if (iter < 20) iterateSimonSeq();          
        }
        // If all 20 sounds have been guessed correctly, restart the game
        else {
          document.getElementById('countnum').value = "WIN";
          
          setTimeout(function() {
            document.getElementById('countnum').value = "01";
            gameSequence = genPattern();
            iter = 0;
            clearInterval(sequenceTimer);
            sequenceTimer = null;

            startGame();
          }, 2000);
        }
      }
    }
  }
}

// Switch back and forth between strict mode
function toggleStrict() {
  // Only turn on/off if the machine is on and a game
  // is not taking place
  if (simonOn && !gameOn) {
    if (strictOn) {
      strictOn = false;
      document.getElementById("isStrict").style.backgroundColor = "#000000";
    }
    else {
      strictOn = true;
      document.getElementById("isStrict").style.backgroundColor = "#FF0000";
    }
  }
}

// Turn off the simon game machine
function turnOffSimon() {
  if (simonOn) {
    simonOn = false;
    gameOn = false;
    strictOn = false;
    playerTurn = false;
    playerClicks = [];
    gameSequence = [];
    iter = 0;
    clearInterval(sequenceTimer);
    sequenceTimer = null;
    clearTimeout(playerClickTimer);
    playerClickTimer = null;

    document.getElementById("offSwitch").style.backgroundColor = "#0099FF";
    document.getElementById("onSwitch").style.backgroundColor = "#000000";
    document.getElementById("isStrict").style.backgroundColor = "#000000";
    document.getElementById("countnum").value = "";
  }
}

// Turn on the simon game machine
function turnOnSimon() {
  if (!simonOn) {
    simonOn = true;
    document.getElementById("offSwitch").style.backgroundColor = "#000000";
    document.getElementById("onSwitch").style.backgroundColor = "#0099FF";
    document.getElementById("countnum").value = "--";
  }
}

// Iterate through the game sequence "iter" number of times,
// record the player responses, and then continue to iter+1
function iterateSimonSeq() {  
  // For 0 through iter, play 0 to iter
  var count = 0;
  sequenceTimer = setInterval(function() {
    switch(gameSequence[count]) {
      case 0:
        clickButton("greenButton");
        break;
      case 1:
        clickButton("redButton");
        break;
      case 2:
        clickButton("yellowButton");
        break;
      case 3:
        clickButton("blueButton");
        break;
    }

    count++;

    if (count === iter+1) {
      clearInterval(sequenceTimer);
      sequenceTimer = null;
    }
  }, 1000);
  
  // Get user input (x number of clicks), and keep
  // game from proceeding until the clicks have been compared
  // to the game sequence
  playerClickTimer = setTimeout(function() {
    playerTurn = true;
    clickableButtons(); 
  }, (iter+2)*1000);
}

// Get the game started (or restart the game)
function startGame() {
  unclickableButtons();
  clearInterval(sequenceTimer);
  sequenceTimer = null;
  clearTimeout(playerClickTimer);
  playerClickTimer = null;
  playerTurn = false;
  playerClicks = [];
  iter = 0;
  
  // Only start a game if the simon machine is on
  if (simonOn) {
    // Set the game to on
    gameOn = true;
    gameSequence = genPattern();
    document.getElementById("countnum").value = "01";

    // Start iterating through the computer sequence
    iterateSimonSeq(gameSequence);
  }
}
var gameOn = false; // If htere is a game taking place or not
var compWait = false; // Is the computer waiting or not to pick a cell
var playerSymbol = "";  // The player symbol
var compSymbol = "";  // The computer symbol
var timeOuts = new Array();
var playerStart = true; // Determines if the player or the computer starts
var playerWins = 0; // # of player wins
var compWins = 0; // # of computer wins

// Check if the position is chosen
// (checks if a number is in an array)
function inChosen(arr, i) {
  for (var z = 0; z < arr.length; z++) {
    if (arr[z] === i) return true;
  }
  
  return false;
}

// This function will fill a triad, whether that is the computer
// picking a cell to complete two other computer cells for a win,
// or the computer picking a cell to keep two player cells from
// filling for a player win
function fillTriad(cells, randCells, searchSymbol, fillSymbol) {
  var chosen = 0;
  
  for (var c = 0; c < 9; c++) {    
    if (cells[randCells[c]].innerHTML === "" && chosen === 0) {
      if (randCells[c] === 0) {
        if ((cells[1].innerHTML === searchSymbol && cells[2].innerHTML === searchSymbol) || (cells[3].innerHTML === searchSymbol && cells[6].innerHTML === searchSymbol) || (cells[4].innerHTML === searchSymbol && cells[8].innerHTML === searchSymbol)) {
          cells[randCells[c]].innerHTML = fillSymbol;
          chosen = 1;
        }
      } else if (randCells[c] === 1) {
        if ((cells[0].innerHTML === searchSymbol && cells[2].innerHTML === searchSymbol) || (cells[4].innerHTML === searchSymbol && cells[7].innerHTML === searchSymbol)) {
          cells[randCells[c]].innerHTML = fillSymbol;
          chosen = 1;
        }
      } else if (randCells[c] === 2) {
        if ((cells[0].innerHTML === searchSymbol && cells[1].innerHTML === searchSymbol) || (cells[4].innerHTML === searchSymbol && cells[6].innerHTML === searchSymbol) || (cells[5].innerHTML === searchSymbol && cells[8].innerHTML === searchSymbol)) {
          cells[randCells[c]].innerHTML = fillSymbol;
          chosen = 1;
        }
      } else if (randCells[c] === 3) {
        if ((cells[0].innerHTML === searchSymbol && cells[6].innerHTML === searchSymbol) || (cells[4].innerHTML === searchSymbol && cells[5].innerHTML === searchSymbol)) {
          cells[randCells[c]].innerHTML = fillSymbol;
          chosen = 1;
        }
      } else if (randCells[c] === 4) {
        if ((cells[0].innerHTML === searchSymbol && cells[8].innerHTML === searchSymbol) || (cells[1].innerHTML === searchSymbol && cells[7].innerHTML === searchSymbol) || (cells[3].innerHTML === searchSymbol && cells[5].innerHTML === searchSymbol) || (cells[2].innerHTML === searchSymbol && cells[6].innerHTML === searchSymbol)) {
          cells[randCells[c]].innerHTML = fillSymbol;
          chosen = 1;
        }
      } else if (randCells[c] === 5) {
        if ((cells[2].innerHTML === searchSymbol && cells[8].innerHTML === searchSymbol) || (cells[3].innerHTML === searchSymbol && cells[4].innerHTML === searchSymbol)) {
          cells[randCells[c]].innerHTML = fillSymbol;
          chosen = 1;
        }
      } else if (randCells[c] === 6) {
        if ((cells[0].innerHTML === searchSymbol && cells[3].innerHTML === searchSymbol) || (cells[2].innerHTML === searchSymbol && cells[4].innerHTML === searchSymbol) || (cells[7].innerHTML === searchSymbol && cells[8].innerHTML === searchSymbol)) {
          cells[randCells[c]].innerHTML = fillSymbol;
          chosen = 1;
        }
      } else if (randCells[c] === 7) {
        if ((cells[1].innerHTML === searchSymbol && cells[4].innerHTML === searchSymbol) || (cells[6].innerHTML === searchSymbol && cells[8].innerHTML === searchSymbol)) {
          cells[randCells[c]].innerHTML = fillSymbol;
          chosen = 1;
        }
      } else if (randCells[c] === 8) {
        if ((cells[0].innerHTML === searchSymbol && cells[4].innerHTML === searchSymbol) || (cells[2].innerHTML === searchSymbol && cells[5].innerHTML === searchSymbol) || (cells[6].innerHTML === searchSymbol && cells[7].innerHTML === searchSymbol)) {
          cells[randCells[c]].innerHTML = fillSymbol;
          chosen = 1;
        }
      }
    }
  }
  
  return chosen;
}

// Pick a computer cell
function pickCompCell() {
  var cs = document.querySelectorAll("td");
  
  // Make random arrangement of 0-8, first initialize the
  // array to all -1's
  var cells = [];
  for (var x = 0; x < 9; x++) cells[x] = -1;
  // Fill the array with a random arrangement of 0-8, each
  // number being unique
  var randnum, found;
  for (var x = 0; x < 9; x++) {
    // Fill the array position with a random number
    // Make sure the number is not already in the array
    do {
      found = 0;  // Is the number already in the array

      randnum = Math.round(Math.random() * 8);  // random number

      // Indicate if the number is already in the array
      for (var y = 0; y < 9; y++) if (cells[y] === randnum) found = 1;

      // If not, put the unique random number in the array
      if (found === 0) cells[x] = randnum;
    } while (cells[x] === -1);
  }
  
  // Complete any computer triads
  if (fillTriad(cs, cells, compSymbol, compSymbol) === 0) {
    // Block any player wins
    if (fillTriad(cs, cells, playerSymbol, compSymbol) === 0) {
      // Pick a random cell to fill with the computer symbol if
      // one hasn't been chosen yet
      for (var c = 0; c < 9; c++) {
        if (cs[cells[c]].innerHTML === "") {
          cs[cells[c]].innerHTML = compSymbol;
          break;
        }
      }
    }
  }
}

// Checks if the player has won
function checkWin() {
  var cs = document.querySelectorAll("td");
  
  var chosen = new Array();
  
  for (var x = 0; x < cs.length; x++) {
    if (cs[x].innerHTML === playerSymbol) chosen.push(x);
  }
  
  // Check if there is a winning pattern for the player
  if ((inChosen(chosen, 0) && inChosen(chosen, 3) && inChosen(chosen, 6)) ||
      (inChosen(chosen, 1) && inChosen(chosen, 4) && inChosen(chosen, 7)) ||
      (inChosen(chosen, 2) && inChosen(chosen, 5) && inChosen(chosen, 8)) ||
      (inChosen(chosen, 0) && inChosen(chosen, 1) && inChosen(chosen, 2)) ||
      (inChosen(chosen, 3) && inChosen(chosen, 4) && inChosen(chosen, 5)) ||
      (inChosen(chosen, 6) && inChosen(chosen, 7) && inChosen(chosen, 8)) ||
      (inChosen(chosen, 0) && inChosen(chosen, 4) && inChosen(chosen, 8)) ||
      (inChosen(chosen, 2) && inChosen(chosen, 4) && inChosen(chosen, 6)))
    return true;
  
  return false;
}

// Checks if the computer has won
function checkCompWin() {
  var cs = document.querySelectorAll("td");
  
  var chosen = new Array();
  
  for (var j = 0; j < cs.length; j++) {
    if (cs[j].innerHTML === compSymbol) chosen.push(j);
  }
  
  // Check if there is a winning pattern for the computer
  if ((inChosen(chosen, 0) && inChosen(chosen, 3) && inChosen(chosen, 6)) ||
      (inChosen(chosen, 1) && inChosen(chosen, 4) && inChosen(chosen, 7)) ||
      (inChosen(chosen, 2) && inChosen(chosen, 5) && inChosen(chosen, 8)) ||
      (inChosen(chosen, 0) && inChosen(chosen, 1) && inChosen(chosen, 2)) ||
      (inChosen(chosen, 3) && inChosen(chosen, 4) && inChosen(chosen, 5)) ||
      (inChosen(chosen, 6) && inChosen(chosen, 7) && inChosen(chosen, 8)) ||
      (inChosen(chosen, 0) && inChosen(chosen, 4) && inChosen(chosen, 8)) ||
      (inChosen(chosen, 2) && inChosen(chosen, 4) && inChosen(chosen, 6)))
    return true;
  
  return false;
}

// Determines if the playing board is full
function isFull() {
  var count = 0;
  var c = document.querySelectorAll("td");
  
  for (var f = 0; f < c.length; f++) {
    if (c[f].innerHTML !== "") count++;
  }
  
  if (count >= 9) return true;
  else return false;
}

// Start the game
function startGame() {  
  if (gameOn === false) {
    var player = prompt("Choose X or O");
    
    while (player !== "X" && player !== "x" && player !== "O" && player !== "o") {
      player = prompt("You must choose X or O");
    }
    
    if (player === "X" || player === "x") {
      playerSymbol = '<span style="color: #FFFF00;">X</span>';
      compSymbol = '<span style="color: #FF0000;">O</span>';
    } else {
      playerSymbol = '<span style="color: #FF0000;">O</span>';
      compSymbol = '<span style="color: #FFFF00;">X</span>';
    }
    
    gameOn = true;
    
    if (playerStart === false) {
      pickCompCell();
      compWait = false;
    }
  }
}

// Choose a cell for the player
function pickCell(cell) {  
  // Cells can only be clicked on if the game is taking place  
  if (gameOn === true && compWait === false && cell.innerHTML === "") {
    cell.innerHTML = playerSymbol;  // Fill the cell with the player symbol
    
    compWait = true;
    
    // If the board is not full, fill with a computer cell
    if (isFull() === false) {
      // Wait a second and then pick a computer cell
      timeOuts.push(setTimeout(function() {
        pickCompCell();
        compWait = false;
        
        // Indicate if the computer has won
        if (checkCompWin() === true) {
          timeOuts.push(setTimeout(function() {
            alert("The computer has won the game! The computer goes first!");
            var pPoints = Number(document.getElementById('cWins').innerHTML) + 1;
            document.getElementById('cWins').innerHTML = pPoints;
            resetGame();
            playerStart = false;
            startGame();
          }, 100));
        }
        // Else indicate if the game is tied
        else if (checkCompWin() === false && checkWin() === false && isFull() === true) {
          alert("The game is tied!");
          resetGame();
          startGame();
        }
      }, 1000));
    }

    // Indicate if the game is tied
    if (checkWin() === false && checkCompWin() === false && isFull() === true) {
      timeOuts.push(setTimeout(function() {
        alert("The game is tied!");
        resetGame();
        startGame();
      }, 100));
    } 
    // Indicate if the player has won the game
    else if (checkWin() === true) {
      timeOuts.push(setTimeout(function() {
        alert("The player has won the game!");
        var pPoints = Number(document.getElementById('pWins').innerHTML) + 1;
        document.getElementById('pWins').innerHTML = pPoints;
        resetGame();
        playerStart = true;
        startGame();
      }, 100));
    }
  }
}

// Clear the board for the next game
function resetGame() {
  var cells = document.querySelectorAll("td");

  for (var c = 0; c < cells.length; c++) cells[c].innerHTML = "";
  for (var t = 0; t < timeOuts.length; t++) clearTimeout(timeOuts[t]);
  
  timeOuts = new Array();
  gameOn = false;
  playerSymbol = "";
  compSymbol = "";
  compWait = false;
}

// Reset the player and computer scores to 0
function clearScores() {
  document.getElementById('pWins').innerHTML = 0;
  document.getElementById('cWins').innerHTML = 0;
}
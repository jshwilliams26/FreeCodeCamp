var start = null; // The timer interval - will get set to change the time every second when "Start" is clicked
var breakTime = false;  // Indicates if it is break time or not

// Decrements the break timer interval
function decrementBreak() {
  if (document.getElementById('breakValue').innerHTML > 1 && start === null) {
    var dbval = document.getElementById('breakValue').innerHTML;
    document.getElementById('breakValue').innerHTML = dbval - 1;
  }
}

// Increments the break timer interval
function incrementBreak() {
  if (start === null) {
    var ibval = document.getElementById('breakValue').innerHTML;
    document.getElementById('breakValue').innerHTML = parseInt(ibval) + 1;
  }
}

// Decrements the timer interval
function decrementTimer() {
  if (document.getElementById('timerValue').innerHTML > 1 && start === null) {
    var dtval = document.getElementById('timerValue').innerHTML;
    document.getElementById('timerValue').innerHTML = dtval - 1;
    document.getElementById('min').innerHTML = dtval - 1;
  }
}

// Increments the timer interval
function incrementTimer() {
  if (start === null) {
    var itval = document.getElementById('timerValue').innerHTML;
    document.getElementById('timerValue').innerHTML = parseInt(itval) + 1;
    document.getElementById('min').innerHTML = parseInt(itval) + 1;
  }
}



// This will cause the timer to countdown
function startTimer() {
  // If start is null, set the interval to decrement every second
  if (start === null) {
    start = setInterval(function() {
      // If the timer has elapsed and it is not the break yet, set the break and set the minutes to the break timespan
      if (document.getElementById('min').innerHTML === "0" && document.getElementById('sec').innerHTML === "00" && breakTime === false) {
        breakTime = true;
        document.getElementById('timerStatus').innerHTML = "Break!";
        document.getElementById('timer').style.color = "#DB324D";
        document.getElementById('min').innerHTML = document.getElementById('breakValue').innerHTML;
      // If the break has elapsed, set the break to false and set the timer to the appropriate value
      } else if (document.getElementById('min').innerHTML === "0" && document.getElementById('sec').innerHTML === "00" && breakTime === true) {
        breakTime = false;
        document.getElementById('timerStatus').innerHTML = "";
        document.getElementById('timer').style.color = "#76E072";
        document.getElementById('min').innerHTML = document.getElementById('timerValue').innerHTML;
      // If the timer has not yet read 0 minutes and 0 seconds, decrement the minute or the seconds
      } else if (document.getElementById('min').innerHTML > 0 || document.getElementById('sec').innerHTML > "00") {
        // If the seconds reach "00", set the second to 59 and decrement the minutes by 1
        if (document.getElementById('sec').innerHTML === "00") {
          document.getElementById('min').innerHTML = document.getElementById('min').innerHTML - 1;
          document.getElementById('sec').innerHTML = 59;
        // Else decrement the seconds by 1
        } else {
          var newSec = document.getElementById('sec').innerHTML - 1;
          if (newSec < 10) {
            newSec = "0" + String(newSec);
          }
          document.getElementById('sec').innerHTML = newSec;
        }
      }
    }, 1000);
  }
}

// This will pause the timer
function stopTimer() {
  clearInterval(start);
  start = null;
}

// This will reset the timer
function resetTimer() {
  clearInterval(start);
  start = null;
  breakTime = false;
  document.getElementById('min').innerHTML = document.getElementById('timerValue').innerHTML;
  document.getElementById('sec').innerHTML = "00";
  document.getElementById('timerStatus').innerHTML = "";
  document.getElementById('timer').style.color = "#76E072";
}
// Will hold the calculation to be done
var calcString = "";

// If the last character in the calculation string is +, *, %, or / then delete it.
// This will keep the program from printing multiple operators to the string
function removeOp() {
  var lc = calcString[calcString.length-1];
  
  if ((lc === "+" || lc === "*" || lc === "/" || lc === "%") && (lc !== "-")) {
    calcString = calcString.substr(0, calcString.length - 1);
  }
}

// If the last character is -, then the program will not add another -.
// This will allow for the concatenation of +-, *-, */, and %-, which will
// allow it to process negative numbers.  But JS will not evaluate --
// (ie, 3--2), subtracting a negative number has to be done as: 3-(-2)
function removeNeg() {
  var nc = calcString[calcString.length-1];
  
  if (nc === "-") {
    calcString = calcString.substr(0, calcString.length - 1);
  }
}

// Add the character that was typed into a string, which will be used to determine the calculation
$('#ce, #leftP, #rightP, #mod, #n1, #n2, #n3, #n4, #n5, #n6, #n7, #n8, #n9, #n0, #add, #sub, #mult, #dec, #eq, #divd').click(function(event) {

  if (event.target.id === "eq") {
    calcString = calcString.replace(/([0-9])[(]/g, "$1\*\(");
    calcString = calcString.replace(/[)]([0-9])/g, "\)\*$1");
    
    var r = eval(calcString);
    calcString = String(r);
    document.getElementById('output').value = calcString;
  } else {
    if (event.target.id === "n1") calcString += "1";
    else if (event.target.id === "n2") calcString += "2";
    else if (event.target.id === "n3") calcString += "3";
    else if (event.target.id === "n4") calcString += "4";
    else if (event.target.id === "n5") calcString += "5";
    else if (event.target.id === "n6") calcString += "6";
    else if (event.target.id === "n7") calcString += "7";
    else if (event.target.id === "n8") calcString += "8";
    else if (event.target.id === "n9") calcString += "9";
    else if (event.target.id === "n0") calcString += "0";
    else if (event.target.id === "dec") calcString += ".";
    else if (event.target.id === "add") {
      removeOp();
      calcString += "+";
    }
    else if (event.target.id === "sub") {
      removeNeg();
      calcString += "-";
    }
    else if (event.target.id === "mult") {
      removeOp();
      calcString += "*";
    }
    else if (event.target.id === "divd") {
      removeOp();
      calcString += "/";
    }
    else if (event.target.id === "mod") {
      removeOp();
      calcString += "%";
    }
    else if (event.target.id === "leftP") calcString += "(";
    else if (event.target.id === "rightP") calcString += ")";
    else if (event.target.id === "ce") calcString = "";

    document.getElementById('output').value = calcString;
  }
});

// Record keyboard input
var key = 0;
document.addEventListener('keydown', function(event) {
  key = event.keyCode;
  
  // If the shift key is pressed, enter the appropriate symbols
  if (event.shiftKey) {
    switch(key) {
      case 53: removeOp(); calcString += "%"; break;
      case 56: removeOp(); calcString += "*"; break;
      case 57: calcString += "("; break;
      case 48: calcString += ")"; break;
      case 187: removeOp(); calcString += "+"; break;
      // Pressing "C" will clear the screen
      case 67: calcString = ""; break;
    }
  // Else enter the appropriate symbols
  } else {
    switch(key) {
      case 49: calcString += "1"; break;
      case 50: calcString += "2"; break;
      case 51: calcString += "3"; break;
      case 52: calcString += "4"; break;
      case 53: calcString += "5"; break;
      case 54: calcString += "6"; break;
      case 55: calcString += "7"; break;
      case 56: calcString += "8"; break;
      case 57: calcString += "9"; break;
      case 48: calcString += "0"; break;
      // Hitting the equal sign will calculate the number
      case 187: {
        calcString = calcString.replace(/([0-9])[(]/g, "$1\*\(");
        calcString = calcString.replace(/[)]([0-9])/g, "\)\*$1");
    
        var r = eval(calcString);
        calcString = String(r);
        document.getElementById('output').value = calcString;
      }; break;
      // Pressing Enter/Return will also calculate the number
      case 13: {
        calcString = calcString.replace(/([0-9])[(]/g, "$1\*\(");
        calcString = calcString.replace(/[)]([0-9])/g, "\)\*$1");
    
        var r = eval(calcString);
        calcString = String(r);
        document.getElementById('output').value = calcString;
      }; break;
      case 189: removeNeg(); calcString += "-"; break;
      case 190: calcString += "."; break;
      case 191: removeOp(); calcString += "/"; break;
      // Pressing Space will clear the screen
      case 32: calcString = ""; break;
      // Pressing "c" will clear the screen
      case 67: calcString = ""; break;
      // Allow the user to delete input one char at a time
      case 8: calcString = calcString.substr(0, calcString.length - 1); break;
    }
  }
  document.getElementById('output').value = calcString;
}, true);
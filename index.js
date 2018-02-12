// console.log('Hello World');
/*
- demonstrate that you fully understand the problem
- consider all edge-cases
- simple solutions
- clean, readable code
- use meaningful variable names
- choose appropriate abstractions
- `node index.js` to run the file from the command prompt
*/

var translateWithNewKeyboard = function(transform, paragraph) {
  //ignore capitalization
  //transformations = string of characters: H, V, S+int
  //edit the keyboard with all transformations in order
  // then,
  //return paragraph typed with new keyboard
  var keyboard = [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']];

  //if H, rotate within same array - y axis
  //if V, swap lines on x axis
  //if S, algorithm to move index by value,
  //if outside of bounds on right,
  //then go to next x axis
  //if outside of bounds on bottom, go to the top x = 0
  //consider negative, goes to the bottom
  if (!transform) {throw new Error ('need valid keyboard transformation order');}
  if (transform.length < 1) {return paragraph;}
  var shiftStr = '';
  var shiftCount = 0;
  var temp;
  for (var i = 0; i < transform.length; i++) {
    if (transform[i] === 'H') {
      for (var h = 0; h < keyboard.length; h++) {
        var rowLength = keyboard[h].length - 1;
        for (var charIndex = 0; charIndex < keyboard[h].length / 2; charIndex++) {
          temp = keyboard[h][charIndex];
          keyboard[h][charIndex] = keyboard[h][rowLength - charIndex];
          keyboard[h][rowLength - charIndex] = temp;
        }
      }
    } else if (transform[i] === 'V') {
      temp = keyboard[0];
      keyboard[0] = keyboard[3];
      keyboard[3] = temp;
      temp = keyboard[1];
      keyboard[1] = keyboard[2];
      keyboard[2] = temp;
    } else if (transform[i] === 'S') {
      i++;
      while (transform[i] !== undefined && transform[i] !== 'H' && transform[i] !== 'V' && transform[i] !== 'S') {
        shiftStr += transform[i];
        i++;
      }
      shiftCount = parseInt(shiftStr);
      var newKeyboard = [[],[],[],[]];
      for (var row = 0; row < keyboard.length; row++) {
        for (var charIndex = 0; charIndex < keyboard[row].length; charIndex++) {
          if (charIndex + shiftCount < keyboard[row].length && charIndex + shiftCount >= 0) {
            newKeyboard[row][charIndex + shiftCount] = keyboard[row][charIndex];
          } else {
            if (charIndex + shiftCount >= keyboard[row].length) {
              if (row + Math.floor((charIndex + shiftCount) / keyboard[row].length) < keyboard.length) {
                newKeyboard[row + Math.floor((charIndex + shiftCount) / keyboard[row].length)][(charIndex + shiftCount) % keyboard[row].length] =
                  keyboard[row][charIndex];
              } else {
                var newRow = (row + Math.floor((charIndex + shiftCount) / keyboard[row].length)) % keyboard.length;
                if (newRow >= keyboard.length) {
                  newRow = newRow % keyboard.length;
                }
                newKeyboard[newRow][(charIndex + shiftCount) % keyboard[row].length] = keyboard[row][charIndex];
              }
            } else {
              // if charIndex + shiftCount < 0

            }
          }
        }
      }
      keyboard = newKeyboard;
    }
  }
  console.log(keyboard);
};
// translateWithNewKeyboard('H', 'What a nice day it is today!');
// translateWithNewKeyboard('V', 'What a nice day it is today!');
// translateWithNewKeyboard('S20', 'What a nice day it is today!');
translateWithNewKeyboard('S-1', 'What a nice day it is today!');
//translateWithNewKeyboard('HHVS12VHVHS3', 'What a nice day it is today!');

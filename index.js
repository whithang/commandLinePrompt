var translateWithNewKeyboard = function(transform, paragraph) {
  //ignore capitalization
  var keyboard = [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']];
  var keyboardHash = {};
  for (var x = 0; x < keyboard.length; x++) {
    for (var y = 0; y < keyboard[x].length; y++) {
      keyboardHash[keyboard[x][y]] = [x, y];
    }
  }

  if (!transform) {throw new Error ('need valid keyboard transformation orders');}
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
      i--;
      shiftCount = parseInt(shiftStr);
      var newKeyboard = [[],[],[],[]];
      for (var row = 0; row < keyboard.length; row++) {
        for (var charIndex = 0; charIndex < keyboard[row].length; charIndex++) {
          if (charIndex + shiftCount < keyboard[row].length && charIndex + shiftCount >= 0) {
            newKeyboard[row][charIndex + shiftCount] = keyboard[row][charIndex];
          } else {
            if (charIndex + shiftCount >= keyboard[row].length) {
              if (row + Math.floor((charIndex + shiftCount) / keyboard[row].length) < keyboard.length) {
                newKeyboard[row + Math.floor((charIndex + shiftCount) / keyboard[row].length)]
                  [(charIndex + shiftCount) % keyboard[row].length] =
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
              newRow = (row + 3) % keyboard.length;
              newKeyboard[newRow][keyboard[row].length + (charIndex + shiftCount)] = keyboard[row][charIndex];
            }
          }
        }
      }
      keyboard = newKeyboard;
    }
  }
  paragraph = paragraph.toLowerCase();
  var translatedContent = '';
  var newLetter;
  for (var char = 0; char < paragraph.length; char++) {
    if (keyboardHash[paragraph[char]]) {
      newLetter = keyboard[keyboardHash[paragraph[char]][0]][keyboardHash[paragraph[char]][1]];
      translatedContent += newLetter;
    } else {
      translatedContent += paragraph[char];
    }
  }
  console.log('The new keyboard is: ', keyboard);
  console.log('The original paragraph was: ', paragraph);
  console.log('The translated paragraph is: ', translatedContent);
};
// translateWithNewKeyboard('H', 'What a nice day it is today!');
// translateWithNewKeyboard('V', 'What a nice day it is today!');
// translateWithNewKeyboard('S20', 'What a nice day it is today!');
// translateWithNewKeyboard('S-2', 'What a nice day it is today!');
// translateWithNewKeyboard('HVS1', 'What a nice day it is today!');
// translateWithNewKeyboard('H', 'What a nice day it is today!');
// translateWithNewKeyboard('HH', 'What a nice day it is today!');
// translateWithNewKeyboard('HHV', 'What a nice day it is today!');
// translateWithNewKeyboard('HHVS12', 'What a nice day it is today!');
// translateWithNewKeyboard('HHVS12V', 'What a nice day it is today!');
// translateWithNewKeyboard('HHVS12VH', 'What a nice day it is today!');
// translateWithNewKeyboard('HHVS12VHV', 'What a nice day it is today!');
// translateWithNewKeyboard('HHVS12VHVH', 'What a nice day it is today!');
translateWithNewKeyboard('HHVS12VHVHS3', 'What a nice day it is today!');

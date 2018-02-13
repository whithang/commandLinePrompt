var translateWithNewKeyboard = function(transform, paragraph) {
  //ignore capitalization
  //update var to let/const
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
  for (var transformIndex = 0; transformIndex < transform.length; transformIndex++) {
    if (transform[transformIndex] === 'H') {
      keyboard = horizontalKeyboard(keyboard);
    } else if (transform[transformIndex] === 'V') {
      keyboard = verticalKeyboard(keyboard);
    } else if (transform[transformIndex] === 'S') {
      var shiftStr = '';
      var shiftCount = 0;
      transformIndex++;
      shiftStr = '';
      while (transform[transformIndex] !== undefined && transform[transformIndex] !== 'H' &&
        transform[transformIndex] !== 'V' && transform[transformIndex] !== 'S') {
        shiftStr += transform[transformIndex];
        transformIndex++;
      }
      transformIndex--;
      shiftCount = parseInt(shiftStr);
      keyboard = shiftKeyboard(shiftCount, keyboard);
    }
  }
  paragraph = paragraph.toLowerCase();
  var translatedContent = translateParagraph(paragraph);

  console.log('The new keyboard is: ', keyboard);
  console.log('The original paragraph was: ', paragraph);
  console.log('The translated paragraph is: ', translatedContent);
};

var horizontalKeyboard = function(keyboard) {
  //could use reverse() function
  var temp;
  for (var row = 0; row < keyboard.length; row++) {
    var rowLength = keyboard[row].length - 1;
    for (var charIndex = 0; charIndex < keyboard[row].length / 2; charIndex++) {
      temp = keyboard[row][charIndex];
      keyboard[row][charIndex] = keyboard[row][rowLength - charIndex];
      keyboard[row][rowLength - charIndex] = temp;
    }
  }
  return keyboard;
};

var verticalKeyboard = function(keyboard) {
  var temp = keyboard[0];
  keyboard[0] = keyboard[3];
  keyboard[3] = temp;
  temp = keyboard[1];
  keyboard[1] = keyboard[2];
  keyboard[2] = temp;
  return keyboard;
};

var shiftKeyboard = function(shiftCount, keyboard) {
  //consider implementing concat and slice functions
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
  return newKeyboard;
};

var translateParagraph = function(paragraph){
  var newContent = '';
  var newLetter;
  for (var char = 0; char < paragraph.length; char++) {
    if (keyboardHash[paragraph[char]]) {
      newLetter = keyboard[keyboardHash[paragraph[char]][0]][keyboardHash[paragraph[char]][1]];
      newContent += newLetter;
    } else {
      newContent += paragraph[char];
    }
  }
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

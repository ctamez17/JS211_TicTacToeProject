'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = 'X';

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin () {
  // Your code here to check for horizontal wins
  var win = false; 
  for (let row = 0; row <= 2; row++)
  {
    if(board[row][0] == playerTurn && board[row][1] == playerTurn && board[row][2] == playerTurn)
    {
      win = true;
    }
  }
  return win;
}

function verticalWin () {
  // Your code here to check for vertical wins
  var win = false; 
  for (let column = 0; column <= 2; column++)
  {
    if(board[0][column] == playerTurn && board[1][column] == playerTurn && board[2][column] == playerTurn)
    {
      win = true;
    }
  }
  return win;
}

function diagonalWin () {
  // Your code here to check for diagonal wins
  var win = false; 
  if (board[0][0] == playerTurn && board[1][1] == playerTurn && board[2][2] == playerTurn || board[0][2] == playerTurn && board[1][1] == playerTurn && board[2][0] == playerTurn)
  {
    win = true;
  }
  return win;
}

function checkForWin () {
  // Your code here call each of the check for types of wins
  var win = false;
  if (horizontalWin() || verticalWin() || diagonalWin())
  {
      win = true;
  }
  return win;
}

function ticTacToe (row, column) {
  // Your code here to place a marker on the board
  board[row][column] = playerTurn;

  // then check for a win
  var win = false;
  win = checkForWin();
  return win;
}

const getPrompt = () => {
  var gameOver = false;
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      gameOver = ticTacToe(row, column);
      if (gameOver == false)
      {
        playerTurn = switchPlayer(playerTurn);
        getPrompt();
      }
      else
      {
        printBoard();
        console.log("Player " + playerTurn + " wins!");
      }
    });
  });
}

function switchPlayer(playerTurn)
{
  if(playerTurn == 'X')
  {
    playerTurn = 'O';
  }
  else
  {
    playerTurn = 'X';
  }
  return(playerTurn);
}

// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}

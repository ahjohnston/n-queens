/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  //input: board size (n)
  //output: board.attributes (object with 0,1,2,3,4....n as keys)
  //edge: none?
  //outer scope variables: n, board
  //inner scope variables: piece positions


  var solution = new Board(n);

  //inner function
  var moveThePieces = function (piecesRemaining, startingRow = 0) {


    //base case A: reach the end of the board

    //base case B: all n pieces are placed
    if (piecesRemaining === 0) {
      return
    }

    //else recursive case:
    ////for loop that places the next piece (using placeNextPiece function)
    //iterate over all possible positions (until position n-1,n-1)
    for (var rows = startingRow; rows < n; rows++) {
      for (var columns = 0; columns < n; columns++) {
        ///IF hasAnyRookConflicts === false, then place the piece
        if (hasAnyRookConflicts.bind(solution) === false) {
          solution.attributes[rows][columns] = 1;
          //recursive call
          moveThePieces(piecesRemaining - 1, rows, columns);
        }
      }
    }




    //place piece A at 0,0

  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

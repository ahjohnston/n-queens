// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //

    countPieces: function (array) {
      // return the result reduce on (the array, a function to add each element)
      return _.reduce(array, function (accumulator, currentItem) {
        return accumulator + currentItem;
      });
    },


    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      var board = this.attributes;
      var row = board[rowIndex]; // array
      if (this.countPieces(row) > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      var board = this.attributes;
      for (var i = 0; i < board.n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },




    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      var board = this.attributes;
      var column = [];

      for (var i = 0; i < board.n; i++) {
        column.push(board[i][colIndex]);
      }
      if (this.countPieces(column) > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      var board = this.attributes;

      for (var column = 0; column < board.n; column++) {
        if (this.hasColConflictAt(column)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      //input can range -(n-1) to (n-1)
      // top left to bottom right
      var board = this.attributes;
      // container for the diagonal cells
      var diagonalCells = [];

      // based on the input param, get the diagonal cells
      // i = row number
      for (var i = 0; i < board.n - Math.abs(majorDiagonalColumnIndexAtFirstRow); i++) {
        if ((majorDiagonalColumnIndexAtFirstRow + i) >= 0) {
          diagonalCells.push(board[i][majorDiagonalColumnIndexAtFirstRow + i]);
        }
      }

      // at this point, we have the diagonal points!
      if (this.countPieces(diagonalCells) > 1) {
        return true;
      }
      return false;





      //2.
      // check upwards until we hit a boundary
      // row - 1, col - 1
      // check down until we hit a boundary
      // row + 1, col + 1

      // if ANY set of coordinates hits another while iterating diagonally, return true
      // return false if we finish iterating

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {

      var board = this.attributes;
      if (board[1][0] === 1 && board[3][2] === 1) {
        debugger;
      }
      // iterate -(n - 1) to +(n - 1)
      // pass each value thru hasMajorDiagonalConflict
      for (var i = -1 * (board.n - 1); i < board.n; i++) {
        if (board[1][0] === 1 && board[3][2] === 1 && i === -1) {
          debugger;
        }
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;


      //1.
      // collect coordinates of all the pieces (1's)
      //

      // 2.
      // iterate the coordinates
      // if it hasMajorDiagonalConflictAt(current set of coordinates)
      // return true

      // if we finish iterating, return false

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      //input: starting index at first row
      //output: boolean
      var board = this.attributes;

      //create array to accumlate coordinates of the diagonal line
      var minDiagonalCells = [];

      //iterate down (row ++) & left (column --) to gather coordinates
      //use two variables: vertical/rows are incremented ++;  horizontal/columns are decremented --
      //if either coordinate is out of range, stop
      var vertical = 0; //row number
      var horizontal = minorDiagonalColumnIndexAtFirstRow; //column number
      while (vertical < board.n && horizontal >= 0) {
        if (horizontal < board.n) {
          minDiagonalCells.push(board[vertical][horizontal]);
        }
        vertical++;
        horizontal--;
      }
      if (this.countPieces(minDiagonalCells) > 1) {
        return true;
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts

    hasAnyMinorDiagonalConflicts: function () {
      var board = this.attributes;

      //iterate across top row from 0 to 2n -1
      // i = column number
      for (var i = 0; i < 2 * board.n - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
      //_getFirstRowColumnIndexForMinorDiagonalOn();

    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());

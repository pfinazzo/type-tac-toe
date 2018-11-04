var table = document.getElementById("table"),
  xScore = document.getElementsByTagName("p")[0],
  oScore = document.getElementsByTagName("p")[1]

function compare(valOne: string, valTwo: string, valThree: string) {
  return valOne === valTwo && valOne === valThree ? true : false; 
}

type State = {
  X: string;
  O: string;
  currentTurn: string;
  playerXscore: number;
  playerOscore: number;
}

var state = {
  playerOne: "X",
  playerTwo: "O",
  currentTurn: "",
  nextTurn: function () {
    return this.currentTurn === "X" ? "O" : "X"
  },
  startingTurn: "",
  board: null,
  playerXscore: 0,
  playerOscore: 0,
  clearBoard: function () {
    this.board = (new Array<string>(9));
    this.board.fill("");
    for (let i = 0; i < this.board.length; i++) {
      let cell = document.getElementById(i.toString());
      cell.textContent = "";
    }
  },
  init: function () {
    this.startingTurn === "X" ? this.startingTurn = "O" : this.startingTurn = "X";
    this.currentTurn = this.startingTurn;
    this.clearBoard();
  },
  move: function (place: number) {
    if (!this.board[place]) {
      this.board.splice(place, 1, this.currentTurn);
      this.switchTurn();
    }
  },
  switchTurn: function () {
    return (this.currentTurn === this.playerOne ? this.currentTurn = this.playerTwo : this.currentTurn = this.playerOne);
  },
  checkWin: function () {
    let win = false
    var checkRows = () => {
      for (let i = 0; i < this.board.length; i++) {
        if (this.board[i] && (i === 0 || i === 3 || i === 6) && (compare(this.board[i], this.board[i + 1], this.board[i + 2]))) {
          win = true;
        }
      }
    };
    var checkCols = () => {
      for (let i = 0; i < this.board.length; i++) {
        if (this.board[i] && (i === 0 || i === 1 || i === 2) && (compare(this.board[i], this.board[i + 3], this.board[i + 6]))) {
          win = true;
        }
      }
    };
    var checkDiagonals = () => {
      // diagonal down
      if (this.board[0] && compare(this.board[0], this.board[4], this.board[8])) {
        win = true;
      }
      //diagonal up
      if (this.board[2] && compare(this.board[2], this.board[4], this.board[6])) {
        win = true;
      }
    }
    checkRows();
    checkCols();
    checkDiagonals();
    if (win) {
      this.scoreAdd();
    }
  },
  scoreAdd: function () {
    this.nextTurn() === "X" ? this.playerXscore++ : this.playerOscore++;
    xScore.textContent = this.playerXscore;
    oScore.textContent = this.playerOscore;
    this.init();
  },
}

table.onclick = function (e) {
  var target = e.target as HTMLElement;
  var idx = (parseInt((target).id));
  state.move(idx);
  target.textContent = state.board[idx];
  state.checkWin();
}

state.init();
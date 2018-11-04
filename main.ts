var table = document.getElementById("table"),
  xScore = document.getElementsByTagName("p")[0],
  tieScore = document.getElementsByTagName("p")[1],
  oScore = document.getElementsByTagName("p")[2]

function compare(valOne: string | boolean, valTwo: string | boolean, valThree?: string | boolean) {
    return valOne === valTwo && valOne === valThree ? true : false;
}

function compareBool(one: boolean, two: boolean, three: boolean, four: boolean){
  return one || two || three || four ? true : false;
}

type State = {
  playerX: string;
  playerO: string;
  currentTurn: string;
  playerXscore: number;
  playerOscore: number;
  tieScore: number;
}

var state = {
  playerX: "X",
  playerO: "O",
  currentTurn: "",
  startingTurn: "",
  board: null,
  playerXscore: 0,
  playerOscore: 0,
  tieScore: 0,

  init: function () {
    this.startingTurn === "X" ? this.startingTurn = "O" : this.startingTurn = "X";
    this.currentTurn = this.startingTurn;
    this.clearBoard();
  },

  clearBoard: function () {
    this.board = (new Array<string>(9));
    this.board.fill("");
    for (let i = 0; i < this.board.length; i++) {
      let cell = document.getElementById(i.toString());
      cell.textContent = "";
    }
  },

  move: function (place: number) {
    if (!this.board[place]) {
      this.board.splice(place, 1, this.currentTurn);
      this.switchTurn();
    }
  },

  switchTurn: function () {
    return (this.currentTurn === this.playerX ? this.currentTurn = this.playerO : this.currentTurn = this.playerX);
  },

  checkWin: function () {
    let win = false;
    for (let i = 0; i < this.board.length; i++) {
      var rows = this.board[i] && (i === 0 || i === 3 || i === 6) && (compare(this.board[i], this.board[i + 1], this.board[i + 2])),
        cols = compare(this.board[i], (i === 0 || i === 1 || i === 2), (compare(this.board[i], this.board[i + 3], this.board[i + 6]))),
        diagonalDown = compare(this.board[0], compare(this.board[0], this.board[4], this.board[8])),
        diagonalUp = compare(this.board[2], compare(this.board[2], this.board[4], this.board[6]));
      if (compareBool(rows, cols, diagonalDown, diagonalUp)) {
        win = true;
      }
    }
    if (win) {
      this.scoreAdd();
    }
  },

  checkTie: function () {
    if (!this.board.includes("")) {
      this.tieScore++;
      tieScore.textContent = this.tieScore;
      return this.init();
    }
  },

  nextTurn: function () {
    return this.currentTurn === "X" ? "O" : "X"
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
  state.checkTie();
}

state.init();
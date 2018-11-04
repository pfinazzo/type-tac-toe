var table = document.getElementById("table"), xScore = document.getElementsByTagName("p")[0], tieScore = document.getElementsByTagName("p")[1], oScore = document.getElementsByTagName("p")[2];
function compare(valOne, valTwo, valThree) {
    return valOne === valTwo && valOne === valThree ? true : false;
}
var state = {
    playerX: "X",
    playerO: "O",
    currentTurn: "",
    nextTurn: function () {
        return this.currentTurn === "X" ? "O" : "X";
    },
    startingTurn: "",
    board: null,
    playerXscore: 0,
    playerOscore: 0,
    tieScore: 0,
    clearBoard: function () {
        this.board = (new Array(9));
        this.board.fill("");
        for (var i = 0; i < this.board.length; i++) {
            var cell = document.getElementById(i.toString());
            cell.textContent = "";
        }
    },
    init: function () {
        this.startingTurn === "X" ? this.startingTurn = "O" : this.startingTurn = "X";
        this.currentTurn = this.startingTurn;
        this.clearBoard();
    },
    move: function (place) {
        if (!this.board[place]) {
            this.board.splice(place, 1, this.currentTurn);
            this.switchTurn();
        }
    },
    switchTurn: function () {
        return (this.currentTurn === this.playerX ? this.currentTurn = this.playerO : this.currentTurn = this.playerX);
    },
    checkWin: function () {
        var _this = this;
        var win = false;
        var checkRows = function () {
            for (var i = 0; i < _this.board.length; i++) {
                if (_this.board[i] && (i === 0 || i === 3 || i === 6) && (compare(_this.board[i], _this.board[i + 1], _this.board[i + 2]))) {
                    win = true;
                }
            }
        };
        var checkCols = function () {
            for (var i = 0; i < _this.board.length; i++) {
                if (_this.board[i] && (i === 0 || i === 1 || i === 2) && (compare(_this.board[i], _this.board[i + 3], _this.board[i + 6]))) {
                    win = true;
                }
            }
        };
        var checkDiagonals = function () {
            // diagonal down
            if (_this.board[0] && compare(_this.board[0], _this.board[4], _this.board[8])) {
                win = true;
            }
            //diagonal up
            if (_this.board[2] && compare(_this.board[2], _this.board[4], _this.board[6])) {
                win = true;
            }
        };
        checkRows();
        checkCols();
        checkDiagonals();
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
    scoreAdd: function () {
        this.nextTurn() === "X" ? this.playerXscore++ : this.playerOscore++;
        xScore.textContent = this.playerXscore;
        oScore.textContent = this.playerOscore;
        this.init();
    }
};
table.onclick = function (e) {
    var target = e.target;
    var idx = (parseInt((target).id));
    state.move(idx);
    target.textContent = state.board[idx];
    state.checkWin();
    state.checkTie();
    console.log(state);
};
state.init();

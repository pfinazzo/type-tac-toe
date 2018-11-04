var table = document.getElementById("table"), xScore = document.getElementsByTagName("p")[0], oScore = document.getElementsByTagName("p")[1];
function compare(valOne, valTwo, valThree) {
    if (valOne === valTwo && valOne === valThree) {
        return true;
    }
    else {
        return false;
    }
}
var state = {
    playerOne: "X",
    playerTwo: "O",
    currentTurn: "",
    nextTurn: function () {
        return this.currentTurn === "X" ? "O" : "X";
    },
    startingTurn: "",
    board: null,
    playerXscore: 0,
    payerOscore: 0,
    init: function () {
        this.board = (new Array(9));
        this.board.fill("");
        this.startingTurn === "X" ? this.startingTurn = "O" : this.startingTurn = "X";
        this.currentTurn = this.startingTurn;
    },
    move: function (place) {
        if (!this.board[place]) {
            this.board.splice(place, 1, this.currentTurn);
            this.switchTurn();
        }
        console.log(this.board);
    },
    switchTurn: function () {
        return (this.currentTurn === this.playerOne ? this.currentTurn = this.playerTwo : this.currentTurn = this.playerOne);
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
            console.log("winner is " + this.nextTurn());
            this.scoreAdd();
        }
    },
    scoreAdd: function () {
        this.nextTurn() === "X" ? this.playerXscore++ : this.playerOscore++;
        xScore.textContent = this.playerXscore;
        oScore.textContent = this.playerOscore;
    }
};
table.onclick = function (e) {
    var target = e.target;
    var idx = (parseInt((target).id));
    state.move(idx);
    target.textContent = state.board[idx];
    state.checkWin();
};
state.init();

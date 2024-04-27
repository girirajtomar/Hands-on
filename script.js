let gameBoard;
let currentPlayer;

let initialize = () => {
    gameBoard = Array(3).fill().map(() => Array(3).fill(null));
    currentPlayer = "X";
}

window.onload = function() {
    initialize();
}

let checkRow = () => {
    return gameBoard.some((row) => row.every((item) => item == currentPlayer));
}

let checkCol = () => {
    return [gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]].every((item) => item == currentPlayer) ||
    [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]].every((item) => item == currentPlayer) ||
    [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]].every((item) => item == currentPlayer);

}

let checkDia1 = () => {
    return [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]].every((item) => item == currentPlayer);
}

let checkDia2 = () => {
    return [gameBoard[2][0], gameBoard[1][1], gameBoard[0][2]].every((item) => item == currentPlayer);
}

let checkWon = () => {
    return checkRow() || checkCol() || checkDia1() || checkDia2();
}

let addMark = (elem, row, col) => {
    if (row > 2 || row < 0 || col > 2 || col < 0) {
        throw new Error("Invalid poisition");
    }
    let markingDone = false;
    if (!gameBoard[row][col]) {
        gameBoard[row][col] = currentPlayer;
        elem.innerHTML = currentPlayer;
        markingDone = true;
    }
    if (checkWon()) {
        alert(`${currentPlayer} WON !`);
        resetGame();
        return;
    }
    if (allFilled()) {
        alert(`GAME DRAW`);
        resetGame();
        return;
    }
    if (markingDone) {
        currentPlayer = currentPlayer == "X" ? "O" : "X";
        document.getElementById('turn-helper').textContent = `Your Turn : ${currentPlayer}`
    }
}

let resetGame = () => {
    gameBoard = Array(3).fill().map(() => Array(3).fill(null));
    currentPlayer = "X";
    let container = document.getElementById("main-container");
    container.childNodes.forEach((child) => {
        child.innerHTML = "";
    });
}

let allFilled = () => {
    let allFilled = true;
    for (let i=0; i<3; i++) {
        if (!gameBoard[i].every((item) => item)) {
            allFilled = false;
        }
    }
    return allFilled;
}

let printGameBoard = () => {
    console.log("--------Current state -------------");
    console.log(gameBoard[0]);
    console.log(gameBoard[1]);
    console.log(gameBoard[2]);
    console.log(`${currentPlayer} your turn`)
}
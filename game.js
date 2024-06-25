document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const displayResult = document.getElementById("displayResult");
    const restartGame = document.getElementById("restart");
    const startGameX = document.getElementById("playerX");
    const startGameO = document.getElementById("playerO");
    const totalScoreX = document.getElementById("totalScoreX");
    const totalScoreO = document.getElementById("totalScoreO");
    let currentPlayer = "";
    let game = ["", "", "", "", "", "", "", "", ""];
    let gameActive = false;
    let scoreX = 0;
    let scoreO = 0;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];

    function handleRestartGame() {
        game = ["", "", "", "", "", "", "", "", ""];
        gameActive = false;
        currentPlayer = "";
        cells.forEach(cell => (cell.innerText = ""));
        displayResult.innerText = "";
    }

    function startGame(player) {
        game = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = player;
        cells.forEach(cell => (cell.innerText = ""));
        displayResult.innerText = `Player ${currentPlayer}'s turn`;
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        if (game[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        game[clickedCellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;

        if (checkWin()) {
            displayResult.innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
            updateScore(currentPlayer);
        } else if (game.includes("")) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            displayResult.innerText = `Player ${currentPlayer}'s turn`;

            if (currentPlayer === "O" && gameActive) {
                computerMove();
            }
        } else {
            displayResult.innerText = "It's a draw!";
            gameActive = false;
        }
    }

    function computerMove() {
        let emptyCells = game.map((cell, index) => (cell === "" ? index : null)).filter(val => val !== null);
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        game[randomIndex] = currentPlayer;
        cells[randomIndex].innerText = currentPlayer;

        if (checkWin()) {
            displayResult.innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
            updateScore(currentPlayer);
        } else if (game.includes("")) {
            currentPlayer = "X";
            displayResult.innerText = `Player ${currentPlayer}'s turn`;
        } else {
            displayResult.innerText = "It's a draw!";
            gameActive = false;
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return game[a] !== "" && game[a] === game[b] && game[b] === game[c];
        });
    }

    function updateScore(player) {
        if (player === "X") {
            scoreX++;
            totalScoreX.innerText = `Player X: ${scoreX}`;
        } else {
            scoreO++;
            totalScoreO.innerText = `Player O: ${scoreO}`;
        }
    }

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    restartGame.addEventListener("click", handleRestartGame);
    startGameX.addEventListener("click", () => startGame("X"));
    startGameO.addEventListener("click", () => startGame("O"));
});

// Gameboard Module
const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const resetBoard = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = "";
      }
    };
  
    const placeMark = (index, mark) => {
      if (board[index] === "") {
        board[index] = mark;
        return true;
      }
      return false;
    };
  
    const isFull = () => board.every(cell => cell !== "");
  
    return { getBoard, resetBoard, placeMark, isFull };
  })();
  
  // Player Factory
  const Player = (name, mark) => {
    return { name, mark };
  };
  
  // Game Controller Module
  const GameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;
  
    const switchPlayer = () => {
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
    };
  
    const checkWinner = () => {
      const board = Gameboard.getBoard();
      const winConditions = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // columns
        [0,4,8], [2,4,6]           // diagonals
      ];
  
      for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          gameOver = true;
          return currentPlayer.name;
        }
      }
      if (Gameboard.isFull()) {
        gameOver = true;
        return "Tie";
      }
      return null;
    };
  
    const playRound = (index) => {
      if (gameOver) return;
      if (Gameboard.placeMark(index, currentPlayer.mark)) {
        const result = checkWinner();
        if (result) {
          DisplayController.showResult(result);
        } else {
          switchPlayer();
        }
      }
    };
  
    const restartGame = () => {
      Gameboard.resetBoard();
      currentPlayer = player1;
      gameOver = false;
      DisplayController.render();
      DisplayController.showResult("");
    };
  
    return { playRound, restartGame };
  })();
  
  // Display Controller Module
  const DisplayController = (() => {
    const boardElement = document.getElementById("gameboard");
    const gameInfo = document.getElementById("game-info");
    const restartBtn = document.getElementById("restart-btn");
  
    const render = () => {
      const board = Gameboard.getBoard();
      boardElement.innerHTML = "";
      board.forEach((cell, index) => {
        const square = document.createElement("div");
        square.classList.add("square");
        if (cell !== "") {
          square.textContent = cell;
          square.classList.add("taken");
        }
        square.addEventListener("click", () => {
          GameController.playRound(index);
          render();
        });
        boardElement.appendChild(square);
      });
    };
  
    const showResult = (result) => {
      if (result === "Tie") {
        gameInfo.textContent = "It's a tie!";
      } else if (result) {
        gameInfo.textContent = `${result} wins!`;
      } else {
        gameInfo.textContent = "";
      }
    };
  
    restartBtn.addEventListener("click", () => {
      GameController.restartGame();
    });
  
    render(); // initial render
  
    return { render, showResult };
  })();
  
import React, { useState } from "react";
import Board from "../Board";

/**
 * A game of tic-tac-toe.
 */
const Game = () => {
  const [gameHistory, setGameHistory] = useState([
    { squares: Array(9).fill(null) },
  ]); // Start of game
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [winnerGameHistory, setwinnerGameHistory] = useState([]);
  const [userName, setUserName] = useState({
    player1: "",
    player2: "",
  });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        console.log(squares[b]);
        return squares[a];
      }
    }

    return null;
  };

  //calculateWinnerLines function return the winning Lines or not.
  const calculateWinnerLines = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        console.log(squares[b]);
        return lines[i];
      }
    }
    return [];
  };

  const handleClick = (i) => {
    const history = gameHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "0";

    setGameHistory([...history, { squares }]);
    setStepNumber(history.length);
    setXisNext(!xIsNext);

    const winner = calculateWinner(squares);
    //condition to verify if they are a winner and it push the winner in the winner game history.
    if (winner !== null) {
      setwinnerGameHistory([...winnerGameHistory, winner]);
      setTimeout(() => {
        alert(`${winner === "X" ? userName.player1 : userName.player2} win the game`);
      }, 100);
    }
    
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const current = gameHistory[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = gameHistory.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button className="button-move" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner === "X" ? userName.player1 : userName.player2;
  } else {
    status = "Next player: " + (xIsNext ? userName.player1 : userName.player2);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          //   We are sending the winnerLines prop to the board component
          winnerLines={calculateWinnerLines(current.squares.slice())}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
      <div className="winner-game">
        <div>
          {/* Map method to render all the winner.*/}
          {winnerGameHistory.map((winner, i) => {
            return (
              <p>
                Game {i + 1} :{" "}
                {winner === "X" ? userName.player1 : userName.player2}
              </p>
            );
          })}
        </div>
      </div>
      <div className="box-player">
        <label>Player X:</label>
        <input
          type="text"
          value={userName.player1}
          onChange={(e) =>
            setUserName({ ...userName, player1: e.target.value })
          }
        />

        <label>Player O:</label>
        <input
          type="text"
          value={userName.player2}
          onChange={(e) =>
            setUserName({ ...userName, player2: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default Game;

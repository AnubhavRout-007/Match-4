import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(
    Array(6).fill(null).map(() => Array(7).fill(null))
  );
  const [isRedNext, setIsRedNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // --- NEW RESET FUNCTION ---
  const resetGame = () => {
    setBoard(Array(6).fill(null).map(() => Array(7).fill(null)));
    setIsRedNext(true);
    setWinner(null);
  };

  const checkWin = (r, c, b) => {
    const player = b[r][c];
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];

    for (let [dr, dc] of directions) {
      let count = 1;
      for (let i of [1, -1]) {
        let nr = r + (dr * i);
        let nc = c + (dc * i);
        while (nr >= 0 && nr < 6 && nc >= 0 && nc < 7 && b[nr][nc] === player) {
          count++;
          nr += (dr * i);
          nc += (dc * i);
        }
      }
      if (count >= 4) return true;
    }
    return false;
  };

  const handleClick = (col) => {
    if (winner) return;

    for (let row = 5; row >= 0; row--) {
      if (!board[row][col]) {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = isRedNext ? 'R' : 'Y';
        setBoard(newBoard);

        if (checkWin(row, col, newBoard)) {
          setWinner(isRedNext ? 'Red' : 'Yellow');
        } else {
          setIsRedNext(!isRedNext);
        }
        break;
      }
    }
  };

  return (
    <div className="game">
      <h1>{winner ? `${winner} Wins!` : `Next: ${isRedNext ? '🔴' : '🟡'}`}</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="slot" onClick={() => handleClick(colIndex)}>
              <div className={`chip ${cell === 'R' ? 'red' : cell === 'Y' ? 'yellow' : ''}`} />
            </div>
          ))
        ))}
      </div>
      
      {/* Updated Reset Button */}
      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
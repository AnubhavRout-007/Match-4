import React, { useState } from 'react';
import './App.css';

const App = () => {
  // 6 rows, 7 columns filled with null
  const [board, setBoard] = useState(
    Array(6).fill(null).map(() => Array(7).fill(null))
  );

  return (
    <div className="game">
      <h1>Match 4</h1>
      <div className="board">
        {board.map((row, rIdx) => 
          row.map((cell, cIdx) => (
            <div key={`${rIdx}-${cIdx}`} className="slot">
              <div className="chip" />
            </div>
          ))
        )}
      </div>
    </div>
  );
const App = () => {
  const [board, setBoard] = useState(Array(6).fill(null).map(() => Array(7).fill(null)));
  const [isRedNext, setIsRedNext] = useState(true);

  const handleClick = (colIndex) => {
    // Check from bottom row up to top row
    for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
      if (!board[rowIndex][colIndex]) {
        const newBoard = board.map(row => [...row]);
        newBoard[rowIndex][colIndex] = isRedNext ? 'R' : 'Y';
        setBoard(newBoard);
        setIsRedNext(!isRedNext); // Switch player
        break;
      }
    }
  };

  return (
    <div className="game">
      <h1>Turn: {isRedNext ? '🔴' : '🟡'}</h1>
      <div className="board">
        {board.map((row, rIdx) => 
          row.map((cell, cIdx) => (
            <div key={`${rIdx}-${cIdx}`} className="slot" onClick={() => handleClick(cIdx)}>
              <div className={`chip ${cell === 'R' ? 'red' : cell === 'Y' ? 'yellow' : ''}`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};  
};

export default App;
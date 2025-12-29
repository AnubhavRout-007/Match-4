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
};

export default App;
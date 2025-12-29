import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // 1. Initialize State from LocalStorage (or defaults)
  const [board, setBoard] = useState(() => {
    const saved = localStorage.getItem('m4_board');
    return saved ? JSON.parse(saved) : Array(6).fill(null).map(() => Array(7).fill(null));
  });

  const [isRedNext, setIsRedNext] = useState(() => {
    const saved = localStorage.getItem('m4_turn');
    return saved ? JSON.parse(saved) : true;
  });

  const [winner, setWinner] = useState(() => {
    const saved = localStorage.getItem('m4_winner');
    return saved ? JSON.parse(saved) : null;
  });

  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('m4_scores');
    return saved ? JSON.parse(saved) : { red: 0, yellow: 0 };
  });

  // 2. Sync State to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('m4_board', JSON.stringify(board));
    localStorage.setItem('m4_turn', JSON.stringify(isRedNext));
    localStorage.setItem('m4_winner', JSON.stringify(winner));
    localStorage.setItem('m4_scores', JSON.stringify(scores));
  }, [board, isRedNext, winner, scores]);

  const checkWin = (r, c, b) => {
    const player = b[r][c];
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (let [dr, dc] of directions) {
      let count = 1;
      for (let side of [1, -1]) {
        let nr = r + dr * side, nc = c + dc * side;
        while (nr >= 0 && nr < 6 && nc >= 0 && nc < 7 && b[nr][nc] === player) {
          count++;
          nr += dr * side; nc += dc * side;
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
          setScores(prev => ({
            ...prev,
            [isRedNext ? 'red' : 'yellow']: prev[isRedNext ? 'red' : 'yellow'] + 1
          }));
        } else {
          setIsRedNext(!isRedNext);
        }
        break;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(6).fill(null).map(() => Array(7).fill(null)));
    setWinner(null);
    setIsRedNext(true);
  };

  const resetAll = () => {
    localStorage.clear();
    setScores({ red: 0, yellow: 0 });
    resetGame();
  };

  return (
    <div className="game">
      <div className="scoreboard">
        <div className="score">Red: {scores.red}</div>
        <div className="score">Yellow: {scores.yellow}</div>
      </div>
      
      <h1>{winner ? `${winner} Wins!` : `Next: ${isRedNext ? '🔴' : '🟡'}`}</h1>
      
      <div className="board">
        {board.map((row, rIdx) => (
          row.map((cell, cIdx) => (
            <div key={`${rIdx}-${cIdx}`} className="slot" onClick={() => handleClick(cIdx)}>
              <div className={`chip ${cell === 'R' ? 'red' : cell === 'Y' ? 'yellow' : ''}`} />
            </div>
          ))
        ))}
      </div>

      <div className="controls">
        <button className="reset-btn" onClick={resetGame}>Next Round</button>
        <button className="clear-btn" onClick={resetAll}>Clear Stats</button>
      </div>
    </div>
  );
};

export default App;
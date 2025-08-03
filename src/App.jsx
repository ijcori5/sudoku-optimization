import React, { useState } from "react";
import "./App.css";


const SudokuApp = () => {
  // Initialize a 9x9 grid with empty values
  const [grid, setGrid] = useState(
    Array(9).fill(null).map(() => Array(9).fill(""))
  );

  // Handle input changes in the grid
  const handleInputChange = (row, col, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const newGrid = [...grid];
      newGrid[row][col] = value; // Update the specific cell
      setGrid(newGrid);
    }
  };

  // Reset the grid
  const handleReset = () => {
    setGrid(Array(9).fill(null).map(() => Array(9).fill("")));
  };

  // Solve the grid (placeholder for actual solving logic)
  const handleSolve = () => {
    const solvedGrid = Array(9)
      .fill(null)
      .map(() =>
        Array(9)
          .fill(null)
          .map(() => Math.floor(Math.random() * 9) + 1)
      );
    setGrid(solvedGrid);
  };

  return (
    <div className="sudoku-container">
      <h1>Sudoku Solver</h1>
      <div className="sudoku-grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={cell}
              onChange={(e) =>
                handleInputChange(rowIndex, colIndex, e.target.value)
              }
              className={`sudoku-cell ${
                rowIndex % 3 === 0 ? "border-top" : ""
              } ${colIndex % 3 === 0 ? "border-left" : ""} ${
                rowIndex === 8 ? "border-bottom" : ""
              } ${colIndex === 8 ? "border-right" : ""}`}
            />
          ))
        )}
      </div>
      <div className="button-container">
        <button className="solve-button" onClick={handleSolve}>
          Solve
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SudokuApp;
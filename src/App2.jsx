import React, { useState } from "react";
import axios from "axios";
import "./App.css"

const SudokuApp2 = () => {
  const [grid, setGrid] = useState(
    Array(9).fill(null).map(() => Array(9).fill(""))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (row, col, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const newGrid = [...grid];
      newGrid[row][col] = value ? parseInt(value, 10) : ""; // Convert to number
      setGrid(newGrid);
    }
  };

  const handleReset = () => {
    setGrid(Array(9).fill(null).map(() => Array(9).fill("")));
    setError("");
  };

  const handleSolve = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/solve", {
        grid: grid.map((row) => row.map((cell) => (cell === "" ? 0 : cell))),
      });

      const solvedGrid = response.data.solvedGrid;
      setGrid(solvedGrid);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred while solving the puzzle."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sudoku-container">
      <h1>Sudoku Solver</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="sudoku-grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={cell || ""}
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
        <button
          className="solve-button"
          onClick={handleSolve}
          disabled={loading}
        >
          {loading ? "Solving..." : "Solve"}
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SudokuApp2;
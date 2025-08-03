import React, { useState } from 'react';
import './samuraiSudokustyle.css'; // Import the CSS for styling

const SamuraiSudoku = () => {
  // Initializing state for the 9x9 central grid and 4 corner grids
  const [centralGrid, setCentralGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [topLeftGrid, setTopLeftGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [topRightGrid, setTopRightGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [bottomLeftGrid, setBottomLeftGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [bottomRightGrid, setBottomRightGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));

  const handleChange = (row, col, value, gridSetter, grid) => {
    const newGrid = grid.map((r, rowIndex) =>
      rowIndex === row ? r.map((c, colIndex) => (colIndex === col ? value : c)) : r
    );
    gridSetter(newGrid);
  };

  const renderCell = (row, col, gridSetter, grid) => (
    <td key={`${row}-${col}`} className="cell">
      <input
        type="number"
        value={grid[row][col] === 0 ? '' : grid[row][col]}
        onChange={(e) => handleChange(row, col, parseInt(e.target.value) || 0, gridSetter, grid)}
        maxLength={1}
        style={{ width: '30px', height: '30px', textAlign: 'center' }}
      />
    </td>
  );

  return (
    <div className="sudoku-container">
      <h1>Samurai Sudoku</h1>
      <div className="grid-container">

        {/* Central 9x9 Grid */}
        <div className="central-grid">
          <table>
            <tbody>
              {centralGrid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((_, colIndex) =>
                    renderCell(rowIndex, colIndex, setCentralGrid, centralGrid)
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top-left Corner Grid */}
        <div className="corner-grid top-left">
          <table>
            <tbody>
              {topLeftGrid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((_, colIndex) =>
                    renderCell(rowIndex, colIndex, setTopLeftGrid, topLeftGrid)
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top-right Corner Grid */}
        <div className="corner-grid top-right">
          <table>
            <tbody>
              {topRightGrid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((_, colIndex) =>
                    renderCell(rowIndex, colIndex + 6, setTopRightGrid, topRightGrid)
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom-left Corner Grid */}
        <div className="corner-grid bottom-left">
          <table>
            <tbody>
              {bottomLeftGrid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((_, colIndex) =>
                    renderCell(rowIndex + 6, colIndex, setBottomLeftGrid, bottomLeftGrid)
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom-right Corner Grid */}
        <div className="corner-grid bottom-right">
          <table>
            <tbody>
              {bottomRightGrid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((_, colIndex) =>
                    renderCell(rowIndex + 6, colIndex + 6, setBottomRightGrid, bottomRightGrid)
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default SamuraiSudoku;
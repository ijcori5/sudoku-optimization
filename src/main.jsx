import React from "react";
import ReactDOM from "react-dom/client"; // React 18+ uses ReactDOM.createRoot instead of ReactDOM.render
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Router for routing
// import SudokuApp from "./App"; // Your main Sudoku app
import SudokuApp2 from "./app2";
import Header from "./header"; // Header for navigation
// Placeholder pages for other puzzles
import SamuraiSudoku from "./SamuraiSudoku";
import SudokuX from "./SudokuX";
import KillerSudoku from "./KillerSudoku";
import OddEvenSudoku from "./oddEvenSudoku";

// This is for React 18+
// Create a root element where React will mount the app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application with the router and header
root.render(
  <React.StrictMode>
    <Router>
      <Header /> {/* This adds the header with navigation */}
      <div className="main-content">
        <Routes>
          {/* Define routes for different puzzles */}
          <Route path="/" element={<SudokuApp2 />} /> {/* Main Sudoku page */}
          <Route path="/samurai-sudoku" element={<SamuraiSudoku />} />
          <Route path="/sudoku-x" element={<SudokuX />} />
          <Route path="/killer-sudoku" element={<KillerSudoku />} />
          <Route path="/odd-even-sudoku" element={<OddEvenSudoku />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
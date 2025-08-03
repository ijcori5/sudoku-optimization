import React from "react";
import { Link } from "react-router-dom"; // Link from react-router-dom for routing
import './Header.css'; // For styling the navigation

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Homepage</Link> {/* Link to the main page */}
      </div>
      <div className="dropdown">
        <button className="dropbtn">Other Puzzles</button>
        <div className="dropdown-content">
          <Link to="/samurai-sudoku">Samurai Sudoku</Link>
          <Link to="/sudoku-x">Sudoku X</Link>
          <Link to="/killer-sudoku">Killer Sudoku</Link>
          <Link to="/odd-even-sudoku">Odd Even Sudoku</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
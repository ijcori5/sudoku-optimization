import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Import the header
import SamuraiSudoku from "./components/SamuraiSudoku";
import SudokuX from "./components/SudokuX";
import KillerSudoku from "./components/KillerSudoku";
import OddEvenSudoku from "./components/OddEvenSudoku";

const App = () => {
    return (
      <Router>
        <Header /> {/* Navigation header */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<SudokuApp />} /> {/* Homepage with Sudoku */}
            <Route path="/samurai-sudoku" element={<SamuraiSudoku />} />
            <Route path="/sudoku-x" element={<SudokuX />} />
            <Route path="/killer-sudoku" element={<KillerSudoku />} />
            <Route path="/odd-even-sudoku" element={<OddEvenSudoku />} />
          </Routes>
        </div>
      </Router>
    );
  };
  
  export default App;
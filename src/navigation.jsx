const Navigation = () => {
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
  
  export default Navigation;
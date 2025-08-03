from flask import Flask, request, jsonify
import sudoku
import numpy as np
import pandas as pd
p
"""
1. Client makes request to Flask server 
2. Flask makes view objects available to view function to process request
    - request object for http requests
3. Return value is a string sent back to client 
"""

app = Flask(__name__) # create an instance

def solve_sudoku(grid):
    return sudoku.solve(grid)


@app.route('/solve', methods = ['POST']) 
def solve():
    data = request.get_json()
    grid = data.get('grid') 
    grid = pd.DataFrame(grid)

    if not is_valid(grid):
        return jsonify({"error": """Invalid Grid. Ensure it contains no duplicate values
                        in each column, row & 3x3 subgrid!"""})
    try:
        solved_grid_df = solve_sudoku(grid)
        solved_grid = solved_grid_df.values.tolist()
        return jsonify({"Solution":solved_grid})
    except Exception as e:
        return jsonify({"Error": f"""The following error occured while
                       solving the puzzle: {e}"""}), 400
        

"""
Input Validation:
    1.) Can't be duplicate values in the same 3x3 subgrid 
    2.) Can't be duplicate values in the same row 
    3.) Can't be duplicate values in the same column
"""
def is_valid(grid):
    
    # Check rows and columns for duplicates
    for i in range(9):
        row_values = [grid[i][j] for j in range(9) if grid[i][j] != 0]
        col_values = [grid[j][i] for j in range(9) if grid[j][i] != 0]
        if len(row_values) != len(set(row_values)) or len(col_values) != len(set(col_values)):
            return False

    # Check 3x3 subgrids for duplicates
    for box_row in range(0, 9, 3):
        for box_col in range(0, 9, 3):
            subgrid_values = [
                grid[r][c]
                for r in range(box_row, box_row + 3)
                for c in range(box_col, box_col + 3)
                if grid[r][c] != 0
            ]
            if len(subgrid_values) != len(set(subgrid_values)):
                return False

    return True

if __name__ == "__main__":
    app.run(debug = True)
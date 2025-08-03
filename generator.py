import random

"""
    Function generates Sudoku puzzles to be solved from various difficulty
    Returns: Sudoku puzzle string
"""


def generate_sudoku_puzzle(difficulty):


    """
    Generates a valid Sudoku puzzle with the specified difficulty.
    :param difficulty: A string: "Easy", "Medium", "Hard", or "Expert".
    :return: A string representing the Sudoku puzzle, with 0s indicating empty cells.
    """

    def is_valid(board, row, col, num):
        """Checks if placing a number is valid."""
        # Check row
        if num in board[row]:
            return False
        # Check column
        if num in (board[i][col] for i in range(9)):
            return False
        # Check 3x3 grid
        start_row, start_col = 3 * (row // 3), 3 * (col // 3)
        for i in range(start_row, start_row + 3):
            for j in range(start_col, start_col + 3):
                if board[i][j] == num:
                    return False
        return True



    def solve(board):

        """Backtracking algorithm to fill the board."""

        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    for num in range(1, 10):
                        if is_valid(board, row, col, num):
                            board[row][col] = num
                            if solve(board):
                                return True
                            board[row][col] = 0
                    return False
        return True

    def remove_cells(board, cells_to_remove):

        """Randomly removes cells from the board."""

        cells = list(range(81))
        random.shuffle(cells)
        for _ in range(cells_to_remove):
            cell = cells.pop()
            row, col = divmod(cell, 9)
            board[row][col] = 0

    # Create an empty board
    board = [[0] * 9 for _ in range(9)]

    # Generate a solved Sudoku board
    solve(board)

    # Determine the number of cells to remove based on difficulty
    difficulty_map = {
        "Easy": 35,
        "Medium": 45,
        "Hard": 55,
        "Expert": 60,
    }
    cells_to_remove = difficulty_map.get(difficulty, 35)  # Default to Easy if invalid input

    # Remove cells to create the puzzle
    remove_cells(board, cells_to_remove)

    # Convert the board to a single string
    return ''.join(str(num) for row in board for num in row)

print(generate_sudoku_puzzle("Expert"))



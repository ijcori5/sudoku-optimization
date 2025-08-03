import pandas as pd 
import pyomo.environ as pyo 
from pyomo.environ import *
from pyomo.opt import SolverFactory 
import generator
import json


"""
Script solves passed in 9x9 Sudoku puzzles using a Binary/Integer Program
V1: Input as a String
Goal: User Interface & develop a backend API for solving
"""


"""
    Method stores the string puzzle as a dataframe
    Args: curr_puzzle: str
    Return: Dataframe
""" 

def sudoku(curr_puzzle):

    if len(curr_puzzle) != 81:
        raise Exception("Invalid entry. Sudoku puzzle must be a 9x9 Grid of 81 values!")

    df = pd.DataFrame(index = range(1, 10), columns = range(1, 10))

    j = 0
    for i in range(len(curr_puzzle)):
        if i >= 9 and i % 9 == 0:
            j += 1
            df.iloc[j, i % 9] = int(curr_puzzle[i])
        else:
            df.iloc[j, i % 9] = int(curr_puzzle[i])

    return solve(df)


"""
    Method solves the Sudoku model using a Binary Integer Program
    Args: Dataframe containing the current Sudoku puzzle
"""
def solve(df):
    model = pyo.ConcreteModel()

    # Declaring Sets
    model.I = pyo.Set(initialize = range(1, 10))
    model.J = pyo.Set(initialize = range(1, 10))
    model.K = pyo.Set(initialize = range(1, 10))

    setI = model.I
    setJ = model.J
    setK = model.K

    # Decision Variables 

    model.x = pyo.Var(setI, setJ, setK, domain = pyo.Binary)
    x = model.x

    # Constraints
    model.constr_list = pyo.ConstraintList()
    constr_list = model.constr_list

    for j in range(9):
        for k in range(9):
            if df.iloc[j, k] == 0:
                continue
            else:
                constr_list.add(expr = x[int(df.iloc[j,k]), j + 1, k + 1] == 1) # set non-zero values in position (j, k) == 1 from passed-in current puzzle
    
    for i in setI:
        for j in setJ:
            constr_list.add(expr = sum(x[i,j,k] for k in setJ) == 1) # Unique value i for each row

        for k in setJ:
            constr_list.add(expr = sum(x[i, j, k] for j in setJ) == 1) # Unique value i for each column

    # Exactly 1 value per cell

    for j in setJ:
        for k in setK:
            constr_list.add(expr = sum(x[i, j, k] for i in setI) == 1)


    # 1 Unique Value per 3x3 Square Grid 

    # Sub-Grids

    for i in range(1, 10):  # Numbers 1 to 9
        for block_row in range(1, 4):  # Block rows 1, 2, 3
            for block_col in range(1, 4):  # Block columns 1, 2, 3
                constr_list.add(expr = sum(x[i, j, k]
                        for j in range((block_row - 1) * 3 + 1, (block_row - 1) * 3 + 4)
                        for k in range((block_col - 1) * 3 + 1, (block_col - 1) * 3 + 4)) == 1)
                
    # Objective

    # Complete the Grid
    model.obj = pyo.Objective(expr = sum(x[i, j, k] for i in setI for j in setJ for k in setK), sense = maximize)

    # Solver
    opt = SolverFactory("glpk", executable  = "C:\\glpk-4.65\\w64\\glpsol")
    results = opt.solve(model)
   
    # Results
    summary_df = pd.DataFrame(index = range(1, 10), columns = range(1, 10))

    if pyo.value(model.obj) != 81:
        raise Exception("Error. Model Objective value should be 81!")
    else:
        for i in setI:
            for j in setJ:
                for k in setK:
                    if pyo.value(x[i, j, k]) == 1:
                        summary_df.loc[j, k] = i
    
    return summary_df

    # return f"Before Puzzle: \n {df} \n After Puzzle: \n {summary_df}"            


if __name__ == "__main__":
    print(sudoku(generator.generate_sudoku_puzzle("Expert")))
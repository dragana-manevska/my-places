import React, { createContext, useContext, useReducer } from 'react';
import { Expense } from '../types/expense.model';

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expenseData: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  updateExpense: (id: string, expenseData: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
};

type ExpensesAction =
  | { type: 'ADD'; payload: Expense }
  | { type: 'SET'; payload: Expense[] }
  | { type: 'UPDATE'; payload: { id: string; data: Omit<Expense, 'id'> } }
  | { type: 'DELETE'; payload: string };

const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  setExpenses: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
});

const expensesReducer = (
  state: Expense[],
  action: ExpensesAction,
): Expense[] => {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      return [...action.payload].reverse();
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

export const ExpensesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData: Expense) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const setExpenses = (expenses: Expense[]) => {
    dispatch({ type: 'SET', payload: expenses });
  };

  const updateExpense = (id: string, expenseData: Omit<Expense, 'id'>) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = (): ExpensesContextType => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error(
      'useExpensesContext must be used within an ExpensesContextProvider',
    );
  }
  return context;
};

import { useState } from 'react';
import { useAuthContext } from '../../auth/store/auth.store';
import { addExpenseApi } from '../api/expenses.api';
import { useExpensesContext } from '../store/expenses.store';
import { Expense } from '../types/expense.model';

export const useCreateExpense = () => {
  const { token } = useAuthContext();
  const { addExpense } = useExpensesContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createExpense = async (data: Omit<Expense, 'id'>) => {
    if (!token) {
      setError('Authentication token is missing!');
      return;
    }

    setIsSubmitting(true);

    try {
      const id = await addExpenseApi(data);
      addExpense({ ...data, id });
      setError(null);
    } catch (error: any) {
      console.error(error);
      setError('Could not create expense. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return { createExpense, isSubmitting, error };
};

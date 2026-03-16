import { useState } from 'react';
import { useAuthContext } from '../../auth/store/auth.store';
import { updateExpenseApi } from '../api/expenses.api';
import { useExpensesContext } from '../store/expenses.store';
import { Expense } from '../types/expense.model';

export const useUpdateExpense = () => {
  const { token } = useAuthContext();
  const { updateExpense } = useExpensesContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateExistingExpense = async (
    id: string,
    data: Omit<Expense, 'id'>,
  ) => {
    if (!token) {
      setError('Authentication token is missing!');
      return;
    }

    setIsSubmitting(true);

    try {
      await updateExpenseApi(id, data);
      updateExpense(id, data);
      setError(null);
    } catch (error: any) {
      console.error(error);
      setError('Could not update expense. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return { updateExistingExpense, isSubmitting, error };
};

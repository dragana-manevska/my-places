import { useState } from 'react';
import { useAuthContext } from '../../auth/store/auth.store';
import { deleteExpenseApi } from '../api/expenses.api';
import { useExpensesContext } from '../store/expenses.store';

export const useDeleteExpense = () => {
  const { token } = useAuthContext();
  const { deleteExpense } = useExpensesContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeExpense = async (id: string) => {
    if (!token) {
      setError('Authentication token is missing!');
      return;
    }

    setIsSubmitting(true);

    try {
      await deleteExpenseApi(id);
      deleteExpense(id);
      setError(null);
    } catch (error: any) {
      console.error(error);
      setError('Could not delete expense. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return { removeExpense, isSubmitting, error };
};

import { isAxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useLogout } from '../../auth/hooks/useLogout';
import { fetchExpensesApi } from '../api/expenses.api';
import { useExpensesContext } from '../store/expenses.store';

export const useExpenses = () => {
  const { logout } = useLogout();
  const { expenses, setExpenses } = useExpensesContext();

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExpenses = useCallback(async () => {
    setIsFetching(true);

    try {
      const data = await fetchExpensesApi();
      setExpenses(data);
      setError(null);
    } catch (error: any) {
      // Handle 401 Unauthorized - token expired or invalid
      if (isAxiosError(error) && error.response?.status === 401) {
        await logout();
        return;
      }

      setError('Could not fetch expenses!');
    }

    setIsFetching(false);
  }, [setExpenses, logout]);

  return { expenses, isFetching, error, loadExpenses };
};

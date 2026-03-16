import ErrorOverlay from '@/src/shared/components/errorOverlay';
import Loader from '@/src/shared/components/Loader';
import { useEffect } from 'react';

import { getDateMinusDays } from '@/src/shared/utils/date';
import ExpensesOutput from '../components/ExpensesOutput';
import { useExpenses } from '../hooks/useExpenses';

export default function RecentExpensesScreen() {
  const { expenses, isFetching, error, loadExpenses } = useExpenses();

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <Loader message='Loading expenses...' />;
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 Days'
      falbackText='No expenses found for the last 7 days.'
    />
  );
}

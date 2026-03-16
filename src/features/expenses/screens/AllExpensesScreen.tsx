import ExpensesOutput from '../components/ExpensesOutput';
import { useExpenses } from '../hooks/useExpenses';

export default function AllExpensesScreen() {
  const { expenses } = useExpenses();

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod='Total'
      falbackText='No expenses found.'
    />
  );
}

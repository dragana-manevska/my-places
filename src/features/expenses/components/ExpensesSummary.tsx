import { formatCurrency } from '@/src/shared/utils/currency';
import { Colors } from '@/src/theme/colors';
import { StyleSheet, Text, View } from 'react-native';
import { Expense } from '../types/expense.model';

interface ExpensesSummaryProps {
  expenses: Expense[];
  periodName: string;
}

const ExpensesSummary = ({ expenses, periodName }: ExpensesSummaryProps) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{formatCurrency(expensesSum)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: Colors.primary600,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  period: {
    fontSize: 14,
    color: Colors.gray100,
    fontWeight: '600',
  },
  sum: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray100,
  },
});

export default ExpensesSummary;

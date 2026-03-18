import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/src/theme/colors';
import { Expense } from '../types/expense.model';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

interface ExpensesOutputProps {
  expenses: Expense[];
  expensesPeriod: string;
  falbackText?: string;
}

const ExpensesOutput = ({
  expenses,
  expensesPeriod,
  falbackText,
}: ExpensesOutputProps) => {
  const infoTextColor = Colors.primary50;
  let content = (
    <Text style={[styles.infoText, { color: infoTextColor }]}>
      {falbackText}
    </Text>
  );

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={expenses}
        periodName={expensesPeriod}
      />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});

export default ExpensesOutput;

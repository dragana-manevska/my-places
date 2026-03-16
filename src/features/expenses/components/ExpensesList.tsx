import React from 'react';
import { FlatList } from 'react-native';
import { Expense } from '../types/expense.model';
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
  expenses: Expense[];
}

const renderExpenseItem = (itemData: any) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }: ExpensesListProps) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

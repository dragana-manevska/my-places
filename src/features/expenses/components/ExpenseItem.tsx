import { formatCurrency } from '@/src/shared/utils/currency';
import { getFormattedDate } from '@/src/shared/utils/date';
import { Colors } from '@/src/theme/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Expense } from '../types/expense.model';

const ExpenseItem = ({ id, description, amount, date }: Expense) => {
  const router = useRouter();
  const expensePressHandler = () => {
    router.navigate({
      pathname: '/(modals)/manage-expenses',
      params: { expenseId: id },
    });
  };
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  container: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: Colors.gray100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray300,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray900,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.gray500,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.success500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 100,
  },
  amount: {
    color: Colors.gray100,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ExpenseItem;

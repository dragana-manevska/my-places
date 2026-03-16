import ExpenseForm from '@/src/features/expenses/components/ExpenseForm';
import { useExpensesContext } from '@/src/features/expenses/store/expenses.store';
import ErrorOverlay from '@/src/shared/components/errorOverlay';
import IconButton from '@/src/shared/components/IconButton';
import Loader from '@/src/shared/components/Loader';
import { Colors } from '@/src/theme/colors';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useCreateExpense } from '../hooks/useCreateExpense';
import { useDeleteExpense } from '../hooks/useDeleteExpense';
import { useUpdateExpense } from '../hooks/useUpdateExpense';
import { Expense } from '../types/expense.model';

export default function ManageExpensesScreen() {
  const navigation = useNavigation();

  const {
    createExpense,
    isSubmitting: isCreating,
    error: createError,
  } = useCreateExpense();
  const {
    removeExpense,
    isSubmitting: isDeleting,
    error: deleteError,
  } = useDeleteExpense();
  const {
    updateExistingExpense,
    isSubmitting: isUpdating,
    error: updateError,
  } = useUpdateExpense();

  const error = createError || deleteError || updateError;
  const isSubmitting = isCreating || isDeleting || isUpdating;

  const { expenses } = useExpensesContext();

  const { expenseId } = useLocalSearchParams<{ expenseId: string }>();

  const isEditing = !!expenseId;

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    removeExpense(expenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData: Omit<Expense, 'id'>) => {
    if (isEditing) {
      updateExistingExpense(expenseId, expenseData);
    } else {
      createExpense(expenseData);
    }
    navigation.goBack();
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <View style={[styles.container]}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            size={24}
            color={Colors.gray100}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: Colors.gray100,
    alignItems: 'center',
  },
});

import { firebaseDbClient } from '@/src/lib/api/firebase-db.client';
import { ExpenseDto, FirebaseExpensesResponse } from '../types/expense.dto';
import { Expense } from '../types/expense.model';
import { expenseMapper } from './expenses.mapper';

export const addExpenseApi = async (
  expenseData: Omit<Expense, 'id'>,
): Promise<string> => {
  const dto: ExpenseDto = expenseMapper.toDto(expenseData);

  const response = await firebaseDbClient.post<string>('/expenses.json', dto);

  return response.data;
};

export const fetchExpensesApi = async (): Promise<Expense[]> => {
  const response =
    await firebaseDbClient.get<FirebaseExpensesResponse>('/expenses.json');
  const data = response.data;

  if (!data) return [];

  return Object.keys(data).map((key) => expenseMapper.toDomain(key, data[key]));
};

export const updateExpenseApi = async (
  id: string,
  expenseData: Omit<Expense, 'id'>,
) => {
  const dto = expenseMapper.toDto(expenseData);
  return await firebaseDbClient.put(`/expenses/${id}.json`, dto);
};

export const deleteExpenseApi = async (id: string) => {
  await firebaseDbClient.delete(`/expenses/${id}.json`);
};

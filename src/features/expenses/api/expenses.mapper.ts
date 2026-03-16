import { ExpenseDto } from '../types/expense.dto';
import { Expense } from '../types/expense.model';

export const expenseMapper = {
  toDomain(id: string, dto: ExpenseDto): Expense {
    return {
      id,
      description: dto.description,
      amount: dto.amount,
      date: new Date(dto.date),
    };
  },

  toDto(expense: Omit<Expense, 'id'>): ExpenseDto {
    return {
      description: expense.description,
      amount: expense.amount,
      date: expense.date.toISOString(),
    };
  },
};

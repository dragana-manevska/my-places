export type ExpenseDto = {
  description: string;
  amount: number;
  date: string; // Firebase stores as string
};

export type FirebaseExpensesResponse = {
  [id: string]: ExpenseDto;
};

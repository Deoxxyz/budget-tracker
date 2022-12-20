const incomeColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f', '#10ac6e', '#0bc77e', '#04e38d', '#00ff9d'];
const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f'];

export const incomeCategories = [
  { type: 'Profit', amount: 0, color: incomeColors[0] },
  { type: 'Extra income', amount: 0, color: incomeColors[2] },
  { type: 'Savings', amount: 0, color: incomeColors[3] },
  { type: 'Rental income', amount: 0, color: incomeColors[8] },
];

export const expenseCategories = [
  { type: 'Bills', amount: 0, color: expenseColors[0] },
  { type: 'Transportation', amount: 0, color: expenseColors[1] },
  { type: 'Supplies', amount: 0, color: expenseColors[2] },
  { type: 'Rental', amount: 0, color: expenseColors[3] },
  { type: 'Food', amount: 0, color: expenseColors[4] },
  { type: 'Payroll', amount: 0, color: expenseColors[5] },
  { type: 'Bad order', amount: 0, color: expenseColors[6] },
  { type: 'Other', amount: 0, color: expenseColors[10] },
];

export const resetCategories = () => {
  incomeCategories.forEach((c) => c.amount = 0);
  expenseCategories.forEach((c) => c.amount = 0);
};

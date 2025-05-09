export interface Transaction {
  id: string;
  amount: string;
  type: 'income' | 'expense';
  date: string;
  description: string;
  account: string;
  industry: string;
  state: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export interface FiltersState {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  account: string;
  industry: string;
  state: string;
}

export interface SummaryData {
  balance: number;
  income: number;
  expenses: number;
  pendingCount: number;
}

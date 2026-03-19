export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

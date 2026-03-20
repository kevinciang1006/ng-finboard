export interface MonthlyReturn {
  month: string;
  value: number;
}

export interface AllocationItem {
  label: string;
  value: number;
}

export interface Portfolio {
  totalValue: number;
  dayChange: number;
  totalReturn: number;
  monthlyReturns: MonthlyReturn[];
  allocation: AllocationItem[];
}

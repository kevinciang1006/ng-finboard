import { Portfolio } from '../models/portfolio.model';

export const MOCK_PORTFOLIO: Portfolio = {
  totalValue: 125430.5,
  dayChange: 1.23,
  totalReturn: 24.5,
  monthlyReturns: [
    { month: 'Jan', value: 2.1  },
    { month: 'Feb', value: -1.5 },
    { month: 'Mar', value: 3.8  },
    { month: 'Apr', value: -0.7 },
    { month: 'May', value: 4.2  },
    { month: 'Jun', value: 5.1  },
    { month: 'Jul', value: -2.3 },
    { month: 'Aug', value: 6.4  },
    { month: 'Sep', value: 2.8  },
    { month: 'Oct', value: -1.1 },
    { month: 'Nov', value: 4.7  },
    { month: 'Dec', value: 3.9  },
  ],
  allocation: [
    { label: 'Stocks', value: 45 },
    { label: 'Bonds',  value: 30 },
    { label: 'Cash',   value: 15 },
    { label: 'ETFs',   value: 10 },
  ],
};

import { Transaction } from '../models/transaction.model';

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TXN-001', date: new Date('2026-01-03T09:14:00.000Z'), description: 'Apple Inc.',       amount: -2450,   status: 'completed', category: 'Equities' },
  { id: 'TXN-002', date: new Date('2026-01-07T11:30:00.000Z'), description: 'Dividend Payment', amount: 312.5,   status: 'completed', category: 'Income'   },
  { id: 'TXN-003', date: new Date('2026-01-10T14:05:00.000Z'), description: 'Microsoft Corp.',  amount: -3100,   status: 'completed', category: 'Equities' },
  { id: 'TXN-004', date: new Date('2026-01-15T08:45:00.000Z'), description: 'Vanguard ETF',     amount: -5000,   status: 'completed', category: 'ETFs'     },
  { id: 'TXN-005', date: new Date('2026-01-18T16:20:00.000Z'), description: 'Bond Coupon',      amount: 187.5,   status: 'completed', category: 'Income'   },
  { id: 'TXN-006', date: new Date('2026-01-22T10:00:00.000Z'), description: 'Tesla Inc.',       amount: -1800,   status: 'pending',   category: 'Equities' },
  { id: 'TXN-007', date: new Date('2026-01-25T13:15:00.000Z'), description: 'NVIDIA Corp.',     amount: -4200,   status: 'completed', category: 'Equities' },
  { id: 'TXN-008', date: new Date('2026-02-01T09:00:00.000Z'), description: 'Treasury Bond',    amount: -10000,  status: 'completed', category: 'Bonds'    },
  { id: 'TXN-009', date: new Date('2026-02-05T11:45:00.000Z'), description: 'Interest Income',  amount: 245.8,   status: 'completed', category: 'Income'   },
  { id: 'TXN-010', date: new Date('2026-02-08T14:30:00.000Z'), description: 'Amazon.com Inc.',  amount: -2750,   status: 'failed',    category: 'Equities' },
  { id: 'TXN-011', date: new Date('2026-02-12T10:10:00.000Z'), description: 'iShares S&P 500',  amount: -3500,   status: 'completed', category: 'ETFs'     },
  { id: 'TXN-012', date: new Date('2026-02-15T15:00:00.000Z'), description: 'Alphabet Inc.',    amount: -1950,   status: 'completed', category: 'Equities' },
  { id: 'TXN-013', date: new Date('2026-02-19T08:30:00.000Z'), description: 'Corporate Bond',   amount: -8000,   status: 'pending',   category: 'Bonds'    },
  { id: 'TXN-014', date: new Date('2026-02-22T12:20:00.000Z'), description: 'Dividend Reinvest',amount: 420,     status: 'completed', category: 'Income'   },
  { id: 'TXN-015', date: new Date('2026-02-26T09:50:00.000Z'), description: 'Meta Platforms',   amount: -2100,   status: 'completed', category: 'Equities' },
  { id: 'TXN-016', date: new Date('2026-03-02T11:00:00.000Z'), description: 'Cash Deposit',     amount: 5000,    status: 'completed', category: 'Cash'     },
  { id: 'TXN-017', date: new Date('2026-03-05T14:45:00.000Z'), description: 'Berkshire B',      amount: -3300,   status: 'pending',   category: 'Equities' },
  { id: 'TXN-018', date: new Date('2026-03-10T10:30:00.000Z'), description: 'Municipal Bond',   amount: -6000,   status: 'completed', category: 'Bonds'    },
  { id: 'TXN-019', date: new Date('2026-03-14T13:00:00.000Z'), description: 'SPDR Gold ETF',    amount: -1600,   status: 'failed',    category: 'ETFs'     },
  { id: 'TXN-020', date: new Date('2026-03-18T09:15:00.000Z'), description: 'Management Fee',   amount: -125,    status: 'completed', category: 'Fees'     },
];

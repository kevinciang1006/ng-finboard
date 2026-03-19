// TODO: Replace with injected data from ReportService.getReports()
import { Report } from '../models/report.model';

export const MOCK_REPORTS: Report[] = [
  {
    id: 'RPT-001',
    name: 'Monthly Revenue Summary',
    period: 'Nov 2025',
    generated_date: new Date('2025-12-01'),
    status: 'ready',
  },
  {
    id: 'RPT-002',
    name: 'Transaction Audit Trail',
    period: 'Q3 2025',
    generated_date: new Date('2025-10-05'),
    status: 'ready',
  },
  {
    id: 'RPT-003',
    name: 'Portfolio Performance',
    period: 'Oct 2025',
    generated_date: new Date('2025-11-02'),
    status: 'ready',
  },
  {
    id: 'RPT-004',
    name: 'Year-End Financial Summary',
    period: 'FY 2025',
    generated_date: new Date('2025-12-15'),
    status: 'processing',
  },
  {
    id: 'RPT-005',
    name: 'Account Reconciliation',
    period: 'Nov 2025',
    generated_date: new Date('2025-12-08'),
    status: 'ready',
  },
  {
    id: 'RPT-006',
    name: 'Expense Analysis',
    period: 'Q4 2025',
    generated_date: new Date('2025-12-10'),
    status: 'processing',
  },
];

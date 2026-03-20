// TODO: Replace with injected data from ReportService.getReports()
import { Report } from '../models/report.model';

export const MOCK_REPORTS: Report[] = [
  { id: 'RPT-001', name: 'Monthly Revenue Summary',    period: 'Nov 2025', generatedDate: '2025-12-01T00:00:00.000Z', status: 'ready'      },
  { id: 'RPT-002', name: 'Transaction Audit Trail',    period: 'Q3 2025',  generatedDate: '2025-10-05T00:00:00.000Z', status: 'ready'      },
  { id: 'RPT-003', name: 'Portfolio Performance',      period: 'Oct 2025', generatedDate: '2025-11-02T00:00:00.000Z', status: 'ready'      },
  { id: 'RPT-004', name: 'Year-End Financial Summary', period: 'FY 2025',  generatedDate: '2025-12-15T00:00:00.000Z', status: 'processing' },
  { id: 'RPT-005', name: 'Account Reconciliation',     period: 'Nov 2025', generatedDate: '2025-12-08T00:00:00.000Z', status: 'ready'      },
  { id: 'RPT-006', name: 'Expense Analysis',           period: 'Q4 2025',  generatedDate: '2025-12-10T00:00:00.000Z', status: 'processing' },
];

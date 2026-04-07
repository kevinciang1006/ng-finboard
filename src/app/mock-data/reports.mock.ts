import { Report } from '../models/report.model';

export const MOCK_REPORTS: Report[] = [
  { id: 'RPT-001', name: 'Q4 2025 Performance Report', period: 'Q4 2025', generatedDate: '2026-01-10T10:00:00.000Z', status: 'ready'      },
  { id: 'RPT-002', name: 'Annual Tax Summary 2025',    period: 'FY 2025',  generatedDate: '2026-01-15T14:30:00.000Z', status: 'ready'      },
  { id: 'RPT-003', name: 'Q3 2025 Performance Report', period: 'Q3 2025',  generatedDate: '2025-10-08T09:00:00.000Z', status: 'ready'      },
  { id: 'RPT-004', name: 'Risk Analysis Report',       period: 'Q4 2025',  generatedDate: '2026-01-20T11:15:00.000Z', status: 'processing' },
  { id: 'RPT-005', name: 'Asset Allocation Summary',   period: 'Q1 2026',  generatedDate: '2026-03-01T08:45:00.000Z', status: 'ready'      },
];

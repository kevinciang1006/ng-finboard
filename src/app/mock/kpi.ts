// TODO: Replace mockKpiData with injected data from API
// Connect to KpiService.getKpiMetrics() to fetch real-time financial KPIs.
import { KpiData } from '../models/kpi.model';

export const mockKpiData: KpiData[] = [
  {
    label: 'Total Revenue',
    value: 1234567,
    delta: 12.3,
    prefix: '$',
  },
  {
    label: 'Active Accounts',
    value: 8472,
    delta: 3.7,
  },
  {
    label: 'Avg Transaction Value',
    value: 2847,
    delta: -1.2,
    prefix: '$',
  },
  {
    label: 'Pending Approvals',
    value: 34,
    delta: -8.5,
  },
];

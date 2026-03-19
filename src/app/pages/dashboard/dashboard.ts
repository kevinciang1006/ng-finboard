/**
 * DashboardComponent
 *
 * Main overview page. Rendered inside AppShellComponent via the router outlet.
 *
 * Data flow:
 *   - mockKpiData      → 4× KpiCardComponent
 *   - mockTransactions → TransactionTableComponent
 *   - (mock portfolio data is consumed internally by PortfolioChartComponent)
 *
 * API Integration:
 *   TODO: Inject DashboardFacadeService (or individual services) here to
 *   replace all mock imports. All mock data is isolated in /src/app/mock/
 *   — replace those imports with service calls.
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card';
import { PortfolioChartComponent } from '../../components/portfolio-chart/portfolio-chart';
import { TransactionTableComponent } from '../../components/transaction-table/transaction-table';
import { mockKpiData } from '../../mock/kpi';
import { mockTransactions } from '../../mock/transactions';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  imports: [KpiCardComponent, PortfolioChartComponent, TransactionTableComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  readonly kpiData = mockKpiData;
  readonly transactions = mockTransactions;

  onTransactionRowClicked(transaction: Transaction): void {
    // TODO: Open transaction detail drawer / dialog
    console.log('[DashboardComponent] Transaction selected:', transaction.id);
  }

  onRangeChanged(range: string): void {
    // TODO: Re-fetch portfolio data from API for the selected range
    console.log('[DashboardComponent] Portfolio range changed:', range);
  }
}

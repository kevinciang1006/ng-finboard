/**
 * PortfolioComponent
 *
 * Portfolio overview page with three signal-driven ng2-charts instances:
 *   1. Line chart — portfolio value over time (via existing PortfolioChartComponent)
 *   2. Doughnut chart — asset allocation breakdown
 *   3. Bar chart — monthly returns (positive = green, negative = red)
 *
 * API Integration:
 *   TODO: Replace all mock data with PortfolioService.getAllocation() and
 *   PortfolioService.getMonthlyReturns(). KPI data should come from
 *   PortfolioService.getSummary().
 */
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card';
import { PortfolioChartComponent } from '../../components/portfolio-chart/portfolio-chart';
import { KpiData } from '../../models/kpi.model';

const MONTHLY_RETURN_VALUES = [2.1, -1.5, 3.8, -0.7, 4.2, 5.1, -2.3, 6.4, 2.8, -1.1, 4.7, 3.9];
const MONTHLY_RETURN_COLORS = MONTHLY_RETURN_VALUES.map((v) =>
  v >= 0 ? 'rgba(22, 163, 74, 0.8)' : 'rgba(220, 38, 38, 0.8)'
);

@Component({
  selector: 'app-portfolio',
  imports: [BaseChartDirective, KpiCardComponent, PortfolioChartComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  // ── KPI Cards ────────────────────────────────────────────────────────────────
  readonly kpiCards: KpiData[] = [
    { label: 'Total Portfolio Value', value: 924500, delta: 2.3, prefix: '$' },
    { label: 'Day Change',            value: 8420,   delta: 0.92, prefix: '+$' },
    { label: 'Total Return',          value: 124500, delta: 15.6, prefix: '+$' },
  ];

  // ── Asset Allocation Doughnut ─────────────────────────────────────────────
  readonly allocationData = signal<ChartData<'doughnut'>>({
    labels: ['Stocks', 'Bonds', 'Cash', 'ETFs'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
        borderWidth: 2,
        borderColor: 'var(--color-surface)',
        hoverBorderColor: 'var(--color-surface)',
        hoverOffset: 6,
      } as ChartDataset<'doughnut'>,
    ],
  });

  readonly doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: {
        position: 'right',
        labels: { color: 'var(--color-text)', padding: 16, font: { size: 12 } },
      },
      tooltip: {
        callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` },
      },
    },
  };

  // ── Monthly Returns Bar ───────────────────────────────────────────────────
  readonly monthlyData = signal<ChartData<'bar'>>({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Return (%)',
        data: MONTHLY_RETURN_VALUES,
        backgroundColor: MONTHLY_RETURN_COLORS,
        borderRadius: 4,
        borderSkipped: false,
      } as ChartDataset<'bar'>,
    ],
  });

  readonly barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => ` ${(ctx.parsed.y ?? 0).toFixed(2)}%` },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'var(--color-text-muted)' },
      },
      y: {
        grid: { color: 'var(--color-border)' },
        ticks: {
          color: 'var(--color-text-muted)',
          callback: (v) => `${v}%`,
        },
      },
    },
  };

  onRangeChanged(range: string): void {
    console.log('[PortfolioComponent] Range changed:', range);
  }
}

/**
 * PortfolioComponent
 *
 * Portfolio overview page powered by TanStack Query.
 * All KPI values, allocation percentages, and monthly return bars
 * are derived from a single GET /portfolio response.
 *
 * Charts are computed signals derived from portfolioQuery.data().
 */
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card';
import { PortfolioChartComponent } from '../../components/portfolio-chart/portfolio-chart';
import { PortfolioService } from '../../core/services/portfolio.service';
import { KpiData } from '../../models/kpi.model';

@Component({
  selector: 'app-portfolio',
  imports: [
    BaseChartDirective,
    KpiCardComponent,
    PortfolioChartComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  private readonly portfolioService = inject(PortfolioService);

  readonly portfolioQuery = injectQuery(() => ({
    queryKey: ['portfolio'] as const,
    queryFn:  () => lastValueFrom(this.portfolioService.getPortfolio()),
  }));

  // ── KPI Cards ────────────────────────────────────────────────────────────────
  readonly kpiCards = computed<KpiData[]>(() => {
    const data = this.portfolioQuery.data();
    if (!data) return [];
    const dayChangeValue    = data.totalValue * (data.dayChange   / 100);
    const totalReturnValue  = data.totalValue * (data.totalReturn / 100);
    return [
      { label: 'Total Portfolio Value', value: data.totalValue,    delta: data.dayChange,   prefix: '$'  },
      { label: 'Day Change',            value: dayChangeValue,      delta: data.dayChange,   prefix: '+$' },
      { label: 'Total Return',          value: totalReturnValue,    delta: data.totalReturn, prefix: '+$' },
    ];
  });

  // ── Asset Allocation Doughnut ─────────────────────────────────────────────
  readonly allocationData = computed<ChartData<'doughnut'>>(() => {
    const items = this.portfolioQuery.data()?.allocation ?? [];
    return {
      labels: items.map((i) => i.label),
      datasets: [
        {
          data: items.map((i) => i.value),
          backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
          borderWidth: 2,
          borderColor: 'var(--color-surface)',
          hoverBorderColor: 'var(--color-surface)',
          hoverOffset: 6,
        } as ChartDataset<'doughnut'>,
      ],
    };
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
  readonly monthlyData = computed<ChartData<'bar'>>(() => {
    const returns = this.portfolioQuery.data()?.monthlyReturns ?? [];
    const values  = returns.map((r) => r.value);
    const colors  = values.map((v) =>
      v >= 0 ? 'rgba(22, 163, 74, 0.8)' : 'rgba(220, 38, 38, 0.8)'
    );
    return {
      labels: returns.map((r) => r.month),
      datasets: [
        {
          label: 'Monthly Return (%)',
          data: values,
          backgroundColor: colors,
          borderRadius: 4,
          borderSkipped: false,
        } as ChartDataset<'bar'>,
      ],
    };
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
      x: { grid: { display: false }, ticks: { color: 'var(--color-text-muted)' } },
      y: {
        grid: { color: 'var(--color-border)' },
        ticks: { color: 'var(--color-text-muted)', callback: (v) => `${v}%` },
      },
    },
  };

  onRangeChanged(range: string): void {
    console.log('[PortfolioComponent] Range changed:', range);
  }
}

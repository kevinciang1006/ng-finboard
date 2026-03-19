/**
 * PortfolioChartComponent
 *
 * Renders a line chart of portfolio value over time with a range toggle.
 * Mock 12-month data is used by default; the `chartData` input overrides it.
 *
 * Inputs:
 *   - chartData: ChartDataset[] — optional external dataset override
 *
 * Outputs:
 *   - rangeChanged: OutputEmitterRef<string> — emitted when user changes the time range
 *
 * API Integration:
 *   TODO: Replace mock data from /src/app/mock/portfolio.ts with injected data
 *   from PortfolioService.getTimeSeries(range: RangeOption). Subscribe in the
 *   parent DashboardComponent and pass the result via the `chartData` input.
 */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import {
  PORTFOLIO_LABELS_12M,
  PORTFOLIO_DATA_12M,
} from '../../mock/portfolio';

export type RangeOption = '3M' | '6M' | '1Y';

@Component({
  selector: 'app-portfolio-chart',
  imports: [BaseChartDirective, MatButtonToggleModule, FormsModule],
  templateUrl: './portfolio-chart.html',
  styleUrl: './portfolio-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioChartComponent {
  readonly chartData = input<ChartDataset[]>([]);
  readonly rangeChanged = output<string>();

  readonly selectedRange = signal<RangeOption>('1Y');

  readonly filteredData = computed<ChartData<'line'>>(() => {
    const range = this.selectedRange();
    const count = range === '3M' ? 3 : range === '6M' ? 6 : 12;
    const labels = PORTFOLIO_LABELS_12M.slice(-count);
    const values = PORTFOLIO_DATA_12M.slice(-count);

    return {
      labels,
      datasets: [
        {
          label: 'Portfolio Value',
          data: values,
          borderColor: 'var(--color-primary)',
          backgroundColor: 'rgba(59, 130, 246, 0.08)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: 'var(--color-primary)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        } as ChartDataset<'line'>,
      ],
    };
  });

  readonly chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` $${(ctx.parsed.y ?? 0).toLocaleString()}`,
        },
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
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
      },
    },
  };

  readonly rangeOptions: RangeOption[] = ['3M', '6M', '1Y'];

  setRange(range: RangeOption): void {
    this.selectedRange.set(range);
    this.rangeChanged.emit(range);
  }
}

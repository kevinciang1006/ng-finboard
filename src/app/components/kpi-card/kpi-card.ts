/**
 * KpiCardComponent
 *
 * Displays a single key performance indicator with label, value, delta %, and trend arrow.
 * Signal inputs make the component fully reactive with zero lifecycle hooks.
 *
 * Inputs:
 *   - label:  string (required) — display name of the KPI
 *   - value:  number (required) — numeric KPI value; IS the valueSignal
 *   - delta:  number            — percentage change vs. prior period (default 0)
 *   - prefix: string            — optional currency symbol, e.g. '$'
 *
 * Outputs: none
 *
 * API Integration:
 *   TODO: Populate via KpiService.getMetrics() and bind the returned KpiData[]
 *   to the parent DashboardComponent, which passes individual values here.
 */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kpi-card',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCardComponent {
  // Signal inputs — the value input IS the valueSignal per Angular 21 best practices.
  // `input.required()` replaces `@Input({ required: true })` and is itself a Signal<T>.
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly delta = input<number>(0);
  readonly prefix = input<string>('');

  // Derived state via computed()
  readonly trend = computed(() => (this.value() > 0 ? 'up' : 'down'));
  readonly isPositiveDelta = computed(() => this.delta() >= 0);

  formatValue(value: number): string {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  }
}

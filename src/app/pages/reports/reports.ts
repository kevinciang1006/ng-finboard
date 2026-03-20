/**
 * ReportsComponent
 *
 * Financial reports page using TanStack Query + Mutation.
 *
 * Query:    ['reports'] → ReportsService.getAll()
 * Mutation: ReportsService.generateReport() → invalidates ['reports'] on success
 *
 * The mat-table binds directly to the query data array —
 * no MatTableDataSource or manual effect() needed.
 */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card';
import { ReportsService } from '../../core/services/reports.service';
import { Report } from '../../models/report.model';
import { KpiData } from '../../models/kpi.model';

const REPORTS_KPI: KpiData[] = [
  { label: 'Total Reports',        value: 48, delta:  12.5 },
  { label: 'Ready to Download',    value: 35, delta:   6.0 },
  { label: 'Processing',           value:  8, delta: -33.3 },
  { label: 'Generated This Month', value: 12, delta:  20.0 },
];

@Component({
  selector: 'app-reports',
  imports: [
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    KpiCardComponent,
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  private readonly reportsService = inject(ReportsService);
  private readonly snackBar       = inject(MatSnackBar);
  private readonly queryClient    = injectQueryClient();

  readonly kpiCards         = REPORTS_KPI;
  readonly displayedColumns = ['id', 'name', 'period', 'generatedDate', 'status', 'actions'];

  // ── Query ──────────────────────────────────────────────────────────────────
  readonly reportsQuery = injectQuery(() => ({
    queryKey: ['reports'] as const,
    queryFn:  () => lastValueFrom(this.reportsService.getAll()),
  }));

  // ── Mutation ───────────────────────────────────────────────────────────────
  readonly generateMutation = injectMutation(() => ({
    mutationFn: () => lastValueFrom(this.reportsService.generateReport()),
    onSuccess: (report: Report) => {
      this.queryClient.invalidateQueries({ queryKey: ['reports'] });
      this.snackBar.open(`Report ${report.id} queued for generation`, 'Dismiss', {
        duration: 3000,
      });
    },
  }));

  downloadReport(report: Report): void {
    // TODO: Call ReportsService.downloadReport(report.id) and stream blob to <a>
    this.snackBar.open(`Downloading "${report.name}"…`, 'Dismiss', { duration: 3000 });
  }

  statusClass(status: Report['status']): string {
    return status === 'ready' ? 'chip-completed' : 'chip-pending';
  }
}

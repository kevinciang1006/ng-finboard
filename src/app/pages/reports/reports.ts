/**
 * ReportsComponent
 *
 * Manages a list of generated financial reports.
 * Demonstrates signal-driven table mutations — adding a new report updates
 * the MatTableDataSource reactively via effect().
 *
 * Signals:
 *   - reports: Signal<Report[]> — entire report list, mutated with update()
 *
 * API Integration:
 *   TODO: Replace MOCK_REPORTS with ReportService.getReports().
 *   TODO: Replace addReport() with ReportService.generateReport(params).
 *   TODO: Replace downloadReport() with ReportService.downloadReport(id).
 */
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card';
import { MOCK_REPORTS } from '../../mock/reports';
import { Report } from '../../models/report.model';
import { KpiData } from '../../models/kpi.model';

const REPORTS_KPI: KpiData[] = [
  { label: 'Total Reports',           value: 48, delta: 12.5 },
  { label: 'Ready to Download',       value: 35, delta: 6.0  },
  { label: 'Processing',              value: 8,  delta: -33.3 },
  { label: 'Generated This Month',    value: 12, delta: 20.0  },
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
    KpiCardComponent,
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  private readonly snackBar = inject(MatSnackBar);

  readonly kpiCards = REPORTS_KPI;
  readonly displayedColumns = ['id', 'name', 'period', 'generated_date', 'status', 'actions'];

  // Signal-driven report list — mutations are fully reactive
  readonly reports = signal<Report[]>(MOCK_REPORTS);

  readonly tableDataSource = new MatTableDataSource<Report>();

  constructor() {
    // Keep MatTableDataSource in sync with the reports signal
    effect(() => {
      this.tableDataSource.data = this.reports();
    });
  }

  addReport(): void {
    const next = this.reports().length + 1;
    const id = `RPT-${String(next).padStart(3, '0')}`;

    this.reports.update((current) => [
      ...current,
      {
        id,
        name: `Custom Report ${id}`,
        period: 'Q1 2026',
        generated_date: new Date(),
        status: 'processing',
      },
    ]);

    this.snackBar.open(`Report ${id} queued for generation`, 'Dismiss', {
      duration: 3000,
    });
  }

  downloadReport(report: Report): void {
    // TODO: Call ReportService.downloadReport(report.id) and pipe blob to <a>
    this.snackBar.open(`Report downloading… (${report.name})`, 'Dismiss', {
      duration: 3000,
    });
  }

  statusClass(status: Report['status']): string {
    return status === 'ready' ? 'chip-completed' : 'chip-pending';
  }
}

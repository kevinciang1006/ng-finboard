import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Report } from '../../models/report.model';
import { MOCK_REPORTS } from '../../mock-data/reports.mock';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private readonly reports = signal<Report[]>([...MOCK_REPORTS]);

  getAll(): Observable<Report[]> {
    return of(this.reports());
  }

  /** Creates a new report in-memory with status 'processing'. */
  generateReport(): Observable<Report> {
    const next = Math.floor(Math.random() * 900) + 100;
    const newReport: Report = {
      id: `RPT-${next}`,
      name: `Custom Report RPT-${next}`,
      period: 'Q1 2026',
      generatedDate: new Date().toISOString(),
      status: 'processing',
    };
    this.reports.update((list) => [...list, newReport]);
    return of(newReport);
  }
}

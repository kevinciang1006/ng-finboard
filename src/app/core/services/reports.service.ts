import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../../models/report.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/reports`;

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl);
  }

  /** POST a new report with status 'processing'. */
  generateReport(): Observable<Report> {
    const next = Math.floor(Math.random() * 900) + 100;
    const newReport: Omit<Report, 'id'> = {
      name: `Custom Report RPT-${next}`,
      period: 'Q1 2026',
      generatedDate: new Date().toISOString(),
      status: 'processing',
    };
    return this.http.post<Report>(this.baseUrl, newReport);
  }
}

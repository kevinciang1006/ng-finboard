import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Portfolio } from '../../models/portfolio.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/portfolio`;

  getPortfolio(): Observable<Portfolio> {
    return this.http.get<Portfolio>(this.baseUrl);
  }
}

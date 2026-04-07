import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Portfolio } from '../../models/portfolio.model';
import { MOCK_PORTFOLIO } from '../../mock-data/portfolio.mock';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  getPortfolio(): Observable<Portfolio> {
    return of(MOCK_PORTFOLIO);
  }
}

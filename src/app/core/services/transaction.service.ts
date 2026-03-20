import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { environment } from '../../../environments/environment';

/** Raw shape returned by json-server (date is an ISO string). */
interface RawTransaction extends Omit<Transaction, 'date'> {
  date: string;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/transactions`;

  /**
   * Fetch transactions using json-server v1 query syntax.
   *
   * json-server v1 operators: field:operator=value
   *   - No operator  → eq (exact match)
   *   - :contains    → case-insensitive substring match
   *
   * _where accepts a JSON object for complex OR/AND logic and
   * overrides normal query params when present, so both status AND
   * search must be encoded inside _where whenever search is active.
   *
   * Cases:
   *   status only  → ?status=completed
   *   search only  → ?_where={"or":[{"description":{"contains":"term"}},{"category":{"contains":"term"}}]}
   *   both         → ?_where={"and":[{"status":{"eq":"completed"}},{"or":[...search...]}]}
   *   neither      → (no params, fetch all)
   */
  getAll(status?: string, query?: string): Observable<Transaction[]> {
    const hasStatus = Boolean(status && status !== 'all');
    const term      = query?.trim() ?? '';
    const hasSearch = term.length > 0;

    let params = new HttpParams();

    if (hasStatus && !hasSearch) {
      // Status filter only — plain eq, no _where needed
      params = params.set('status', status!);
    } else if (!hasStatus && hasSearch) {
      // Search only — OR across description and category
      params = params.set(
        '_where',
        JSON.stringify({
          or: [
            { description: { contains: term } },
            { category:    { contains: term } },
          ],
        })
      );
    } else if (hasStatus && hasSearch) {
      // Both — must encode status inside _where; _where overrides normal params
      params = params.set(
        '_where',
        JSON.stringify({
          and: [
            { status: { eq: status! } },
            {
              or: [
                { description: { contains: term } },
                { category:    { contains: term } },
              ],
            },
          ],
        })
      );
    }
    // else: no filters — fetch all, no params added

    return this.http
      .get<RawTransaction[]>(this.baseUrl, { params })
      .pipe(
        map((items) => items.map((item) => ({ ...item, date: new Date(item.date) })))
      );
  }

  getById(id: string): Observable<Transaction> {
    return this.http
      .get<RawTransaction>(`${this.baseUrl}/${id}`)
      .pipe(map((item) => ({ ...item, date: new Date(item.date) })));
  }
}

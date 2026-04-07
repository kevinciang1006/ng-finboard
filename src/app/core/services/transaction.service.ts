import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { MOCK_TRANSACTIONS } from '../../mock-data/transactions.mock';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  getAll(status?: string, query?: string): Observable<Transaction[]> {
    const hasStatus = Boolean(status && status !== 'all');
    const term = query?.trim().toLowerCase() ?? '';
    const hasSearch = term.length > 0;

    let results = MOCK_TRANSACTIONS;

    if (hasStatus) {
      results = results.filter((t) => t.status === status);
    }

    if (hasSearch) {
      results = results.filter(
        (t) =>
          t.description.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term)
      );
    }

    return of(results);
  }

  getById(id: string): Observable<Transaction> {
    const transaction = MOCK_TRANSACTIONS.find((t) => t.id === id);
    if (!transaction) {
      throw new Error(`Transaction ${id} not found`);
    }
    return of(transaction);
  }
}

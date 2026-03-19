/**
 * TransactionsComponent
 *
 * Full-page transaction explorer with signal-driven filtering.
 *
 * Signals:
 *   - selectedStatus — filter by transaction status (all/completed/pending/failed)
 *   - searchQuery    — free-text search over description & category
 *   - filteredTransactions (computed) — derived from both filters
 *   - totalCount / totalAmount (computed) — summary stats
 *
 * API Integration:
 *   TODO: Replace mockTransactions with TransactionService.getTransactions().
 *   For server-side filtering, pass filter params to the API instead of
 *   computing filteredTransactions on the client.
 */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TransactionTableComponent } from '../../components/transaction-table/transaction-table';
import { mockTransactions } from '../../mock/transactions';
import { Transaction } from '../../models/transaction.model';

type StatusFilter = 'all' | 'completed' | 'pending' | 'failed';

@Component({
  selector: 'app-transactions',
  imports: [
    CurrencyPipe,
    FormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TransactionTableComponent,
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  private readonly allTransactions: Transaction[] = mockTransactions;

  readonly selectedStatus = signal<StatusFilter>('all');
  readonly searchQuery = signal('');

  readonly filteredTransactions = computed(() => {
    const status = this.selectedStatus();
    const query = this.searchQuery().toLowerCase().trim();

    return this.allTransactions.filter((t) => {
      const matchesStatus = status === 'all' || t.status === status;
      const matchesSearch =
        !query ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  });

  readonly totalCount = computed(() => this.filteredTransactions().length);

  readonly totalAmount = computed(() =>
    this.filteredTransactions().reduce((sum, t) => sum + t.amount, 0)
  );

  constructor() {
    // Demonstrates effect() usage: logs filter state on every change
    effect(() => {
      console.log('[TransactionsComponent] Filters changed:', {
        status: this.selectedStatus(),
        query: this.searchQuery(),
        results: this.filteredTransactions().length,
      });
    });
  }

  onRowClicked(transaction: Transaction): void {
    // TODO: Open transaction detail panel / drawer
    console.log('[TransactionsComponent] Row clicked:', transaction.id);
  }
}

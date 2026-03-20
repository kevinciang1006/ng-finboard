/**
 * TransactionsComponent
 *
 * Full-page transaction explorer backed by TanStack Query.
 * Filters (status + free-text) are part of the query key, so changing
 * either signal automatically triggers a re-fetch.
 *
 * Query:  ['transactions', selectedStatus, searchQuery]
 *         → TransactionService.getAll(status, query)
 *
 * Note: for a production API, debounce searchQuery before it enters the
 * query key to avoid a round-trip on every keystroke.
 */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { TransactionTableComponent } from '../../components/transaction-table/transaction-table';
import { TransactionService } from '../../core/services/transaction.service';
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
    MatButtonModule,
    MatProgressSpinnerModule,
    TransactionTableComponent,
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  private readonly transactionService = inject(TransactionService);

  readonly selectedStatus = signal<StatusFilter>('all');
  readonly searchQuery = signal('');

  // Query key includes filter signals — auto-refetches when either changes
  readonly transactionsQuery = injectQuery(() => ({
    queryKey: ['transactions', this.selectedStatus(), this.searchQuery()] as const,
    queryFn: () =>
      lastValueFrom(
        this.transactionService.getAll(this.selectedStatus(), this.searchQuery())
      ),
  }));

  readonly transactions = computed<Transaction[]>(
    () => this.transactionsQuery.data() ?? []
  );

  readonly totalCount  = computed(() => this.transactions().length);
  readonly totalAmount = computed(() =>
    this.transactions().reduce((sum, t) => sum + t.amount, 0)
  );

  constructor() {
    effect(() => {
      console.log('[TransactionsComponent] Filters changed:', {
        status:  this.selectedStatus(),
        query:   this.searchQuery(),
        results: this.transactions().length,
      });
    });
  }

  onRowClicked(transaction: Transaction): void {
    console.log('[TransactionsComponent] Row clicked:', transaction.id);
  }
}

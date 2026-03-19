/**
 * TransactionTableComponent
 *
 * Displays a paginated, sortable table of financial transactions.
 *
 * Inputs:
 *   - transactions: Transaction[] — list of transactions to render
 *
 * Outputs:
 *   - rowClicked: OutputEmitterRef<Transaction> — emitted when user clicks a row
 *
 * API Integration:
 *   TODO: Replace mockTransactions (in dashboard) with injected data from API.
 *   Example: inject TransactionService and call getTransactions() to populate
 *   the `transactions` input. For server-side pagination, replace MatPaginator
 *   with a custom datasource implementing CollectionViewer.
 */
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-table',
  imports: [
    CurrencyPipe,
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
  ],
  templateUrl: './transaction-table.html',
  styleUrl: './transaction-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionTableComponent {
  readonly transactions = input<Transaction[]>([]);
  readonly rowClicked = output<Transaction>();

  private readonly sortRef = viewChild(MatSort);
  private readonly paginatorRef = viewChild(MatPaginator);

  readonly displayedColumns: string[] = [
    'date',
    'description',
    'category',
    'amount',
    'status',
  ];

  readonly dataSource = new MatTableDataSource<Transaction>();

  constructor() {
    // Sync signal inputs + view children into the imperative MatTableDataSource
    effect(() => {
      this.dataSource.data = this.transactions();
      const sort = this.sortRef();
      const paginator = this.paginatorRef();
      if (sort) this.dataSource.sort = sort;
      if (paginator) this.dataSource.paginator = paginator;
    });
  }

  onRowClick(transaction: Transaction): void {
    this.rowClicked.emit(transaction);
  }

  statusColor(status: Transaction['status']): string {
    const map: Record<Transaction['status'], string> = {
      completed: 'chip-completed',
      pending: 'chip-pending',
      failed: 'chip-failed',
    };
    return map[status];
  }
}

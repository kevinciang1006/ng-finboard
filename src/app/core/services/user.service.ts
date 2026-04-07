import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { MOCK_USER } from '../../mock-data/user.mock';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly user = signal<User>({ ...MOCK_USER });

  getUser(): Observable<User> {
    return of(this.user());
  }

  /** Applies partial updates in-memory. */
  updateUser(updates: Partial<User>): Observable<User> {
    this.user.update((current) => ({ ...current, ...updates }));
    return of(this.user());
  }
}

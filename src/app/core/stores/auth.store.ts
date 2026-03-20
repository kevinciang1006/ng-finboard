/**
 * AuthStore — NgRx SignalStore for global user / auth state.
 *
 * State:  { user, isLoading, error }
 * Computed: isLoggedIn, isAdmin, displayName, userInitials
 * Methods:  loadUser(), updateUser(Partial<User>), logout()
 *
 * Provided at root — use inject(AuthStore) anywhere.
 */
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap, tap, catchError } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../services/user.service';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed(({ user }) => ({
    isLoggedIn:   computed(() => user() !== null),
    isAdmin:      computed(() => user()?.role === 'admin'),
    displayName:  computed(() => user()?.name ?? 'Guest'),
    userInitials: computed(() =>
      (user()?.name ?? 'G')
        .split(' ')
        .map((n) => n[0] ?? '')
        .join('')
        .toUpperCase()
        .slice(0, 2)
    ),
  })),

  withMethods((store) => {
    const userService = inject(UserService);

    const loadUser = rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          userService.getUser().pipe(
            tap((user) => patchState(store, { user, isLoading: false })),
            catchError((e: unknown) => {
              patchState(store, {
                error: e instanceof Error ? e.message : 'Failed to load user',
                isLoading: false,
              });
              return EMPTY;
            })
          )
        )
      )
    );

    const updateUser = rxMethod<Partial<User>>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((updates) =>
          userService.updateUser(updates).pipe(
            tap((user) => patchState(store, { user, isLoading: false })),
            catchError((e: unknown) => {
              patchState(store, {
                error: e instanceof Error ? e.message : 'Failed to update user',
                isLoading: false,
              });
              return EMPTY;
            })
          )
        )
      )
    );

    return {
      loadUser,
      updateUser,
      logout: () => patchState(store, { user: null, error: null }),
    };
  })
);

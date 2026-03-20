import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthStore } from '../core/stores/auth.store';

/**
 * ThemeService
 *
 * Singleton service that owns the dark/light mode state.
 * Applies `.dark` to `document.body` and exposes `isDark` as a Signal
 * so any component can reactively read the current theme.
 *
 * applyDark()  — local only; used to restore persisted preference on load
 * setDark()    — applies locally AND persists to user profile via AuthStore
 * toggle()     — convenience wrapper around setDark()
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document  = inject<Document>(DOCUMENT);
  private readonly authStore = inject(AuthStore);

  readonly isDark = signal(false);

  /** Apply dark mode locally only — no API call. Used when restoring on load. */
  applyDark(dark: boolean): void {
    this.isDark.set(dark);
    this.document.body.classList.toggle('dark', dark);
  }

  /** Apply dark mode locally and persist the preference to the user profile. */
  setDark(dark: boolean): void {
    this.applyDark(dark);
    const user = this.authStore.user();
    if (user) {
      this.authStore.updateUser({
        preferences: { ...user.preferences, darkMode: dark },
      });
    }
  }

  toggle(): void {
    this.setDark(!this.isDark());
  }
}

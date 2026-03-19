import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * ThemeService
 *
 * Singleton service that owns the dark/light mode state.
 * Applies `.dark` to `document.body` and exposes `isDark` as a Signal
 * so any component can reactively read the current theme.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject<Document>(DOCUMENT);

  readonly isDark = signal(false);

  setDark(dark: boolean): void {
    this.isDark.set(dark);
    this.document.body.classList.toggle('dark', dark);
  }

  toggle(): void {
    this.setDark(!this.isDark());
  }
}

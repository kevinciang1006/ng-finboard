/**
 * SettingsComponent
 *
 * User settings backed by NgRx AuthStore.
 * On mount, loadUser() fetches the current user from the API and
 * populates both forms via effect(). On save, updateUser() PATCHes
 * the API and updates the global store state.
 *
 * Dark mode toggle is live (no Save needed) — owned by ThemeService.
 */
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThemeService } from '../../services/theme.service';
import { AuthStore } from '../../core/stores/auth.store';

@Component({
  selector: 'app-settings',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly fb       = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  readonly themeService     = inject(ThemeService);
  readonly authStore        = inject(AuthStore);

  readonly timezones = [
    { value: 'America/New_York',    label: 'Eastern Time (ET)'    },
    { value: 'America/Chicago',     label: 'Central Time (CT)'    },
    { value: 'America/Denver',      label: 'Mountain Time (MT)'   },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)'    },
    { value: 'Asia/Singapore',      label: 'Singapore Time (SGT)' },
    { value: 'UTC',                 label: 'UTC'                   },
  ];

  // ── Profile Form ──────────────────────────────────────────────────────────
  readonly profileForm = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    email:       ['', [Validators.required, Validators.email]],
    timezone:    ['UTC'],
  });

  // ── Preferences Form ──────────────────────────────────────────────────────
  readonly preferencesForm = this.fb.group({
    emailAlerts:       [false],
    pushNotifications: [false],
    monthlyDigest:     [false],
  });

  constructor() {
    // Fetch user from API on mount
    this.authStore.loadUser();

    // Populate forms once user data arrives in the store
    effect(() => {
      const user = this.authStore.user();
      if (!user) return;

      this.profileForm.patchValue(
        { displayName: user.name, email: user.email, timezone: user.timezone },
        { emitEvent: false }
      );
      this.preferencesForm.patchValue(
        {
          emailAlerts:       user.preferences.emailAlerts,
          pushNotifications: user.preferences.pushNotifications,
          monthlyDigest:     user.preferences.monthlyDigest,
        },
        { emitEvent: false }
      );

      // Mark pristine after population so Save button stays disabled
      this.profileForm.markAsPristine();
      this.preferencesForm.markAsPristine();
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    const { displayName, email, timezone } = this.profileForm.value;
    this.authStore.updateUser({
      name:     displayName ?? '',
      email:    email       ?? '',
      timezone: timezone    ?? 'UTC',
    });
    this.snackBar.open('Profile updated successfully', 'OK', { duration: 3000 });
    this.profileForm.markAsPristine();
  }

  savePreferences(): void {
    const prefs = this.preferencesForm.value;
    this.authStore.updateUser({
      preferences: {
        emailAlerts:       prefs.emailAlerts       ?? false,
        pushNotifications: prefs.pushNotifications ?? false,
        monthlyDigest:     prefs.monthlyDigest     ?? false,
        darkMode:          this.themeService.isDark(),
      },
    });
    this.snackBar.open('Preferences saved', 'OK', { duration: 3000 });
    this.preferencesForm.markAsPristine();
  }
}

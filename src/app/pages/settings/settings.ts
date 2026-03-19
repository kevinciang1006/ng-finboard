/**
 * SettingsComponent
 *
 * User settings page with two Reactive Form sections:
 *
 *   Section 1 — Profile: displayName, email, timezone
 *   Section 2 — Preferences: dark/light theme toggle + notification toggles
 *
 * Theme state is owned by ThemeService (singleton) so changes are reflected
 * globally across the app immediately — without waiting for "Save".
 *
 * API Integration:
 *   TODO: Replace mock form defaults with UserService.getProfile() data.
 *   TODO: Save handlers should call UserService.updateProfile() and
 *   UserService.updatePreferences().
 */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { ThemeService } from '../../services/theme.service';

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
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  readonly themeService = inject(ThemeService);

  readonly timezones = [
    { value: 'America/New_York',    label: 'Eastern Time (ET)' },
    { value: 'America/Chicago',     label: 'Central Time (CT)' },
    { value: 'America/Denver',      label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'UTC',                 label: 'UTC' },
  ];

  // ── Profile Form ──────────────────────────────────────────────────────────
  readonly profileForm = this.fb.group({
    displayName: ['Kevin Chang', [Validators.required, Validators.minLength(2)]],
    email:       ['kevin@example.com', [Validators.required, Validators.email]],
    timezone:    ['America/New_York'],
  });

  // ── Preferences Form ──────────────────────────────────────────────────────
  readonly preferencesForm = this.fb.group({
    emailAlerts:      [true],
    pushNotifications:[false],
    monthlyDigest:    [true],
  });

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    // TODO: await UserService.updateProfile(this.profileForm.value)
    this.snackBar.open('Profile updated successfully', 'OK', { duration: 3000 });
    this.profileForm.markAsPristine();
  }

  savePreferences(): void {
    // TODO: await UserService.updatePreferences(this.preferencesForm.value)
    this.snackBar.open('Preferences saved', 'OK', { duration: 3000 });
    this.preferencesForm.markAsPristine();
  }
}

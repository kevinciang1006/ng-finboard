/**
 * AppShellComponent
 *
 * Application layout shell with responsive sidebar navigation, top toolbar,
 * and a RouterOutlet for lazy-loaded page content.
 *
 * - Active nav item is highlighted via routerLinkActive
 * - Page title in the top bar updates dynamically from the current route
 * - Theme (dark/light) is managed by ThemeService; toggle lives in SettingsComponent
 * - Sidebar auto-collapses on mobile via BreakpointObserver
 *
 * Inputs: none
 * Outputs: none
 */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../services/theme.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  exactMatch: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',    icon: 'dashboard',    route: '/',             exactMatch: true  },
  { label: 'Transactions', icon: 'receipt_long', route: '/transactions', exactMatch: false },
  { label: 'Portfolio',    icon: 'show_chart',   route: '/portfolio',    exactMatch: false },
  { label: 'Reports',      icon: 'bar_chart',    route: '/reports',      exactMatch: false },
  { label: 'Settings',     icon: 'settings',     route: '/settings',     exactMatch: false },
];

const PAGE_TITLES: Record<string, string> = {
  '/':             'Dashboard',
  '/transactions': 'Transactions',
  '/portfolio':    'Portfolio',
  '/reports':      'Reports',
  '/settings':     'Settings',
};

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  readonly themeService = inject(ThemeService);

  readonly navItems = NAV_ITEMS;
  readonly sidenavOpened = signal(true);

  private readonly router = inject(Router);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url.split('?')[0]),
      startWith(this.router.url.split('?')[0])
    ),
    { initialValue: '/' }
  );

  readonly pageTitle = computed(
    () => PAGE_TITLES[this.currentUrl()] ?? 'Financial Dashboard'
  );

  private readonly mobileBreakpoint = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map((state) => state.matches)),
    { initialValue: false }
  );

  readonly isMobile = computed(() => this.mobileBreakpoint() ?? false);

  constructor() {
    // Auto-collapse sidebar when viewport enters mobile breakpoint
    effect(() => {
      if (this.isMobile()) {
        this.sidenavOpened.set(false);
      }
    });
  }

  toggleSidenav(): void {
    this.sidenavOpened.update((v) => !v);
  }
}

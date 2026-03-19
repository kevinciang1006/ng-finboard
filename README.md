# ng-finboard

**Financial Dashboard Component Library** — a portfolio demo showcasing Angular 21 enterprise UI patterns.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://kevinciang.github.io/ng-finboard)

---

## Overview

`ng-finboard` is a production-quality Angular 21 financial dashboard built to demonstrate:

- **Angular 21 standalone components** with `ChangeDetectionStrategy.OnPush` throughout
- **Angular Signals** — reactive state with `signal()`, `computed()`, and `toSignal()`
- **Zoneless change detection** via `provideZonelessChangeDetection()`
- **Angular Material 21** (M3 design system) with light/dark theme support
- **Tailwind CSS v4** + SCSS CSS custom properties for a consistent design token system
- **ng2-charts + Chart.js** for interactive data visualization
- **TypeScript strict mode** — zero `any` types

> All mock data is isolated in `/src/app/mock/` — replace with your API services.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21.2.x, standalone, zoneless |
| UI Library | Angular Material 21 (M3) + Angular CDK |
| Styling | Tailwind CSS v4 + SCSS + CSS custom properties |
| Charts | ng2-charts v10 + Chart.js v4 |
| Language | TypeScript 5.9 (strict mode) |
| Testing | Vitest |
| Build | `@angular/build:application` (esbuild) |

---

## Setup

```bash
# 1. Clone
git clone https://github.com/kevinciang/ng-finboard.git
cd ng-finboard

# 2. Install dependencies
npm install

# 3. Start dev server
npm start
# → http://localhost:4200

# 4. Production build
npm run build
```

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── app-shell/          # Layout: sidebar + topbar
│   │   ├── kpi-card/           # KPI metric card
│   │   ├── portfolio-chart/    # Line chart with range toggle
│   │   └── transaction-table/  # Sortable/paginated table
│   ├── mock/                   # ← Replace these with API services
│   │   ├── kpi.ts
│   │   ├── portfolio.ts
│   │   └── transactions.ts
│   ├── models/
│   │   ├── kpi.model.ts
│   │   └── transaction.model.ts
│   └── pages/
│       └── dashboard/          # Main dashboard view
├── styles.scss                 # Global theme + Angular Material
└── tailwind.css                # Tailwind v4 entry point
```

---

## Component API

### `<app-shell>`

Application layout shell with responsive sidebar navigation and top toolbar.

| Property | Type | Description |
|---|---|---|
| *(internal)* `isDark` | `Signal<boolean>` | Tracks dark mode; writes `.dark` to `document.body` |
| *(internal)* `isMobile` | `Signal<boolean>` | Derived from CDK `BreakpointObserver` |
| *(internal)* `sidenavOpened` | `Signal<boolean>` | Sidebar open/close state |

Use `<ng-content>` projection to pass page content:
```html
<app-shell>
  <your-page-content></your-page-content>
</app-shell>
```

---

### `<app-kpi-card>`

Displays a single KPI metric with label, value, delta percentage, and trend icon.

| Input | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | ✅ | Display name of the KPI |
| `value` | `number` | ✅ | Numeric KPI value |
| `delta` | `number` | — | Percentage change vs. prior period (default `0`) |
| `prefix` | `string` | — | Optional currency symbol, e.g. `'$'` |

**Signals used:** `valueSignal`, `deltaSignal`, `trend` (computed), `isPositiveDelta` (computed)

**API TODO:** Inject `KpiService.getMetrics()` and bind in the parent dashboard.

---

### `<app-portfolio-chart>`

Line chart of portfolio value over time with 3M / 6M / 1Y range toggle.

| Input | Type | Required | Description |
|---|---|---|---|
| `chartData` | `ChartDataset[]` | — | External dataset override |

| Output | Type | Description |
|---|---|---|
| `rangeChanged` | `EventEmitter<string>` | Emitted when user changes time range |

**Signals used:** `selectedRange: Signal<'3M'|'6M'|'1Y'>`, `filteredData` (computed — slices mock data by range)

**API TODO:** Replace `PORTFOLIO_DATA_12M` / `PORTFOLIO_LABELS_12M` from mock with `PortfolioService.getTimeSeries(range)`.

---

### `<app-transaction-table>`

Sortable, paginated `mat-table` of financial transactions. Rows are clickable.

| Input | Type | Required | Description |
|---|---|---|---|
| `transactions` | `Transaction[]` | — | Array of transactions to display (default `[]`) |

| Output | Type | Description |
|---|---|---|
| `rowClicked` | `EventEmitter<Transaction>` | Emitted when the user clicks a row |

**Transaction interface:**
```typescript
interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  category: string;
}
```

**API TODO:** Inject `TransactionService.getTransactions()` and pass the result to the `transactions` input.

---

## Theming

CSS custom properties are defined in `src/styles.scss` and toggled via the `.dark` class on `document.body`:

```scss
:root {
  --color-primary:     #3b82f6;
  --color-surface:     #ffffff;
  --color-surface-alt: #f8fafc;
  --color-border:      #e2e8f0;
  --color-text:        #0f172a;
  --color-text-muted:  #64748b;
}

body.dark {
  --color-primary:     #60a5fa;
  --color-surface:     #0f172a;
  --color-surface-alt: #1e293b;
  --color-border:      #334155;
  --color-text:        #f8fafc;
  --color-text-muted:  #94a3b8;
}
```

The `AppShellComponent` toggles dark mode by calling `document.body.classList.add/remove('dark')`, driven by `isDark = signal(false)`.

---

## Mock Data

All mock data lives in `/src/app/mock/` and is clearly annotated with `// TODO:` comments pointing to the equivalent API call:

| File | Contents | Replace with |
|---|---|---|
| `transactions.ts` | 20 sample transactions | `TransactionService.getTransactions()` |
| `kpi.ts` | 4 KPI metrics | `KpiService.getMetrics()` |
| `portfolio.ts` | 12-month portfolio values | `PortfolioService.getTimeSeries(range)` |

---

## Code Quality

- All components use `ChangeDetectionStrategy.OnPush`
- State is managed via Angular Signals (`signal`, `computed`, `toSignal`)
- No `any` types — TypeScript strict mode enabled
- Dependency injection uses `inject()` function (compatible with zoneless)
- All `@Input()` / `@Output()` are explicitly typed via interfaces

---

## Deployment

This project is automatically deployed to **GitHub Pages** on every push to `main`.

| Step | Detail |
|---|---|
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |
| Trigger | Push to `main` branch |
| Build command | `ng build --base-href /ng-finboard/` |
| Deploy target | `gh-pages` branch via `peaceiris/actions-gh-pages@v4` |
| Live URL | <https://kevinciang.github.io/ng-finboard> |

To enable GitHub Pages for this repo:
1. Push to `main` — the Action will create the `gh-pages` branch automatically.
2. Go to **Settings → Pages** in your GitHub repo.
3. Set **Source** to `Deploy from a branch` → branch `gh-pages` → `/ (root)`.

---

## License

MIT

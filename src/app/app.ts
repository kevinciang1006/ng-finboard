import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppShellComponent } from './components/app-shell/app-shell';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  template: '<app-shell />',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}

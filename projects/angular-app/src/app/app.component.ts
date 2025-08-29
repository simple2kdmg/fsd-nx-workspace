import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from '../features/navigation';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationBarComponent],
  selector: 'fsd-angular-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  get initialize(): boolean {
    console.count('app component redrawn');
    return true;
  }
}

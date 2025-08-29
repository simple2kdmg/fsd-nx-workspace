import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: 'second-page.component.html',
  styleUrls: ['second-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SecondPageComponent {
  parentId: string | null = null;

  toggleContentId(): void {
    this.parentId = !this.parentId ? '123' : null;
  }
}

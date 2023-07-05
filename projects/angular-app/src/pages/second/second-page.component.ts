import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: 'second-page.component.html',
    styleUrls: ['second-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondPageComponent {
    parentId: string | null = null;

    toggleContentId(): void {
        this.parentId = !this.parentId ? '123' : null;
    }
}

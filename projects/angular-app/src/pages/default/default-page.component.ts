import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: 'default-page.component.html',
    styleUrls: ['default-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent {
    parentId: string | null = null;

    toggleContentId(): void {
        this.parentId = !this.parentId ? '123' : null;
    }
}

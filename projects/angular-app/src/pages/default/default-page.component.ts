import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DefaultPageContentData } from './model/default-page-content-data.model';

@Component({
    templateUrl: 'default-page.component.html',
    styleUrls: ['default-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent {
    data: DefaultPageContentData | null = null;
    primitiveData?: number;

    toggleContentId(): void {
        this.data = !this.data ? { id: '12345', name: 'test-data' } : null;
        this.primitiveData = !this.primitiveData ? 5 : undefined;
    }
}

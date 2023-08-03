import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DefaultPageContentData } from '../../model/default-page-content-data.model';

@Component({
    selector: 'fsd-default-page-content',
    templateUrl: 'default-page-content.component.html',
    styleUrls: ['default-page-content.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageContentComponent {
    @Input() data: DefaultPageContentData | null = null;
    @Input() primitiveData?: number | null = 0;
}

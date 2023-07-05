import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'fsd-default-page-content',
    templateUrl: 'default-page-content.component.html',
    styleUrls: ['default-page-content.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageContentComponent {
    @Input() id: string | null = null;
}

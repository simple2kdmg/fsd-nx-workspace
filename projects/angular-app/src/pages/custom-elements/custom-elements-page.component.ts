import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: 'custom-elements-page.component.html',
    styleUrls: ['custom-elements-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomElementsPageComponent {
    value: string | null = null;

    onToggleValue(): void {
        this.value = this.value ? null : 'initial value';
    }
}

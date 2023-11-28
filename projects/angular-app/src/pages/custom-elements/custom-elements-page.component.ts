import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconName, SvgIconSize } from '../../shared/model';

@Component({
    templateUrl: 'custom-elements-page.component.html',
    styleUrls: ['custom-elements-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomElementsPageComponent {
    value: string | null = null;
    iconName: SvgIconName | null = 'ShoppingCart';
    iconSize: SvgIconSize = 's';

    constructor() {}

    onToggleIconName(): void {
        this.iconName =
            this.iconName === 'ShoppingCart' ? 'Delete' : 'ShoppingCart';
    }

    onToggleIconSize(): void {
        this.iconSize = this.iconSize === 's' ? 'l' : 's';
    }
}

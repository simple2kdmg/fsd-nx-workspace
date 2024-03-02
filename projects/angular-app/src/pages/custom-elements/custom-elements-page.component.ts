import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconName, SvgIconSize } from '../../shared/model';
import { BehaviorSubject, catchError, delay, interval, map, mergeAll, mergeMap, of, startWith, switchMap, take, timer, toArray } from 'rxjs';

@Component({
    templateUrl: 'custom-elements-page.component.html',
    styleUrls: ['custom-elements-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomElementsPageComponent {
    value: string | null = null;
    iconName: SvgIconName | null = 'ShoppingCart';
    iconSize: SvgIconSize = 's';

    disabledValue$ = timer(2000).pipe(map(() => null));
    toggle$ = new BehaviorSubject(false);

    constructor() {}

    toggle(): void {
        const current = this.toggle$.getValue();
        this.toggle$.next(!current);
    }

    onToggleIconName(): void {
        this.iconName = this.iconName === 'ShoppingCart' ? 'Delete' : 'ShoppingCart';
    }

    onToggleIconSize(): void {
        this.iconSize = this.iconSize === 's' ? 's' : 'm';
    }
}

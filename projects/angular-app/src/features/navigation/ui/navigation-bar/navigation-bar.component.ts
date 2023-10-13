import { ChangeDetectionStrategy, Component } from '@angular/core';
import { take } from 'rxjs';
import { ApplicationPath } from '../../../../shared/model';
import { NavigationService } from '../../model/navigation.service';
import { NavigationItem } from '../../model/navigation-item.model';

@Component({
    selector: 'fsd-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
    readonly navItems: NavigationItem[] = [
        {
            pageCode: '',
            pageTitle: 'Default',
            relativeUrl: ApplicationPath.Default,
            sortOrder: 1,
        },
        {
            pageCode: '',
            pageTitle: 'Second',
            relativeUrl: ApplicationPath.Second,
            sortOrder: 2,
        },
        {
            pageCode: '',
            pageTitle: 'Custom Elements',
            relativeUrl: ApplicationPath.CustomElements,
            sortOrder: 3,
        },
    ];
    readonly currentUrl$ = this.navigationService.urlWithoutQuery$;

    constructor(private readonly navigationService: NavigationService) {}

    onLinkClick(url: string): void {
        this.currentUrl$.pipe(take(1)).subscribe((currentUrl) => {
            if (currentUrl === url) return;

            this.navigationService.updateRoute({ url });
        });
    }
}

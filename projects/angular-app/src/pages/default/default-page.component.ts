import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DefaultPageContentData } from './model/default-page-content-data.model';
import { BreakpointsService } from '../../shared/model';
import { BehaviorSubject, Observable, Subscription, interval, of, shareReplay, timer } from 'rxjs';

@Component({
    templateUrl: 'default-page.component.html',
    styleUrls: ['default-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent {
    data: DefaultPageContentData | null = null;
    primitiveData?: number;

    constructor(private readonly breakpointsService: BreakpointsService) {
        this.breakpointsService.matchBreakpoint('sm').subscribe(matched => console.log(`1 MATCHED SM: `, matched));

        
    }

    get initialize(): boolean {
        console.count('DefaultPageComponent redrawn');
        return true;
    }

    toggleContentId(): void {
        this.data = !this.data ? { id: '12345', name: 'test-data' } : null;
        this.primitiveData = !this.primitiveData ? 5 : undefined;
    }
}

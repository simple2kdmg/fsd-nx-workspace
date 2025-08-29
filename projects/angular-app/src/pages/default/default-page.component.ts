import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { DefaultPageContentData } from './model/default-page-content-data.model';
import { BreakpointsService, HOST_COMPONENT } from '../../shared/model';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
  combineLatest,
  interval,
  map,
  of,
  share,
  shareReplay,
  startWith,
  tap,
  timer
} from 'rxjs';
import { BemDirective } from '../../shared/lib';
import { DefaultPageContentComponent } from './ui/default-page-content/default-page-content.component';
import { HostBindingTestComponent } from './ui/host-binding-test/host-binding-test.component';

@Component({
  standalone: true,
  imports: [BemDirective, DefaultPageContentComponent, HostBindingTestComponent],
  templateUrl: 'default-page.component.html',
  styleUrls: ['default-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: HOST_COMPONENT,
      useValue: DefaultPageComponent
    }
  ]
})
export default class DefaultPageComponent {
  data: DefaultPageContentData | null = null;
  primitiveData?: number;

  constructor(private readonly breakpointsService: BreakpointsService) {
    this.breakpointsService
      .matchBreakpoint('sm')
      .subscribe((matched) => console.log(`1 MATCHED SM: `, matched));

    const repl1$ = new Subject<number>();

    repl1$
      .pipe(startWith(0))
      .subscribe((x) => console.log(`Replay with startWith`, x));
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

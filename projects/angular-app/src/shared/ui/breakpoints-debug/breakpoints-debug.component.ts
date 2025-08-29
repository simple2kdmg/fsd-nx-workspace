import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointsService } from '../../model';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'fsd-breakpoints-debug',
  styleUrls: ['breakpoints-debug.component.less'],
  templateUrl: 'breakpoints-debug.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreakpointsDebugComponent {
  matchXs$ = this.breakpointService.matchBreakpoint('xs');
  matchSmAndMd$ = this.breakpointService.matchBreakpoint(['sm', 'md']);
  matchDownLg$ = this.breakpointService.matchDown('lg');
  matchUpLg$ = this.breakpointService.matchUp('lg');

  constructor(private readonly breakpointService: BreakpointsService) {
  }
}

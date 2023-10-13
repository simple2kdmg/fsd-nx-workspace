import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BreakpointsService } from './breakpoints.service';


@NgModule({
  providers: [BreakpointsService],
})
export class BreakpointsModule {
  constructor(@Optional() @SkipSelf() private readonly breakpointsModule: BreakpointsModule) {
    if (this.breakpointsModule) {
      throw new Error('You have already imported `BreakpointsModule`. Import it only in root module.');
    }
  }
}

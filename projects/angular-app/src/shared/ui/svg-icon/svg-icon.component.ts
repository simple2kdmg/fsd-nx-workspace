import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges
} from '@angular/core';
import { SvgIconRegistryService } from './svg-icon-registry.service';
import { SvgIconName, SvgIconSize } from '../../model';
import { SafeHtml } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'fsd-svg-icon',
  template: `@if (svgHtmlContent$ | async; as svgHtmlContent) {
    <div class="svg-container" [innerHtml]="svgHtmlContent"></div>
  }`,
  styleUrls: ['svg-icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent implements OnChanges {
  @Input() name: SvgIconName | null = null;

  @Input()
  @HostBinding('attr.data-size')
  size: SvgIconSize = 's';

  readonly svgHtmlContent$ = new ReplaySubject<SafeHtml>(1);

  constructor(
    private readonly svgIconRegistryService: SvgIconRegistryService
  ) {
  }

  ngOnChanges(): void {
    if (!this.name || !this.size) {
      return;
    }

    this.svgIconRegistryService
      .get(this.name, this.size)
      .subscribe((svgHtmlContent) =>
        this.svgHtmlContent$.next(svgHtmlContent)
      );
  }
}

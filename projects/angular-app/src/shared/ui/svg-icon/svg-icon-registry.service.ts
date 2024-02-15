import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, ReplaySubject, map } from 'rxjs';
import { SvgIconName, SvgIconSize } from '../../model';

const SVG_ICON_SIZE_MAP: Record<SvgIconSize, string> = {
  s: '12px',
  m: '16px',
  l: '20px',
};

@Injectable({ providedIn: 'root' })
export class SvgIconRegistryService {
  private readonly iconsPool = new Map<string, ReplaySubject<SafeHtml>>();

  constructor(private readonly sanitizer: DomSanitizer, private readonly httpClient: HttpClient) {}

  get(name: SvgIconName, size: SvgIconSize = 's'): Observable<SafeHtml> {
    const svgIconFileName = this.getSvgFileName(name, size);

    if (!this.iconsPool.has(svgIconFileName)) {
      const safeContent$ = new ReplaySubject<SafeHtml>(1);
      this.iconsPool.set(svgIconFileName, safeContent$);

      this.httpClient
        .get(`/assets/svgs/${svgIconFileName}`, { responseType: 'text' })
        .pipe(map(content => this.sanitizer.bypassSecurityTrustHtml(content)))
        .subscribe(safeContent => safeContent$.next(safeContent));
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.iconsPool.get(svgIconFileName)!.asObservable();
  }

  private getSvgFileName(name: SvgIconName, size: SvgIconSize): string {
    return `${SVG_ICON_SIZE_MAP[size]}_${name}.svg`;
  }
}

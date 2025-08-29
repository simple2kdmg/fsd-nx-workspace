import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { WINDOW } from '../tokens/window.token';
import { BrowserOnly } from '../../lib';

type ContentType = 'text/csv' | 'text/plain';

const EXTENSION_MAP: Record<ContentType, string> = {
  'text/csv': 'csv',
  'text/plain': 'txt',
};

@Injectable({ providedIn: 'root' })
export class FileDownloadService {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(WINDOW) private readonly window: Window & typeof globalThis,
    @Inject(PLATFORM_ID) public readonly platformId: object,
  ) {}

  public txt(httpResponse: HttpResponse<Blob>, fallbackName: string): void {
    this.download('text/plain', httpResponse, fallbackName);
  }

  public csv(httpResponse: HttpResponse<Blob>, fallbackName: string): void {
    this.download('text/csv', httpResponse, fallbackName);
  }

  @BrowserOnly()
  /**
   * Сохраняет данные `responseBlob.body` в файл типа `contentType`. Имя файла формируется на основе *content-disposition* заголовка
   * в виде `{name}_{date}.csv`. В случае отсутствия заголовка используется значение `fallbackName` параметра.
   * */
  private download(contentType: ContentType, httpResponse: HttpResponse<Blob>, fallbackName: string): void {
    if (httpResponse.body) {
      const temporaryLink = this.document.createElement('a');
      const blob = new Blob([httpResponse.body], {
        type: httpResponse.headers.get('content-type') ?? contentType,
      });
      const url = this.window.URL.createObjectURL(blob);
      const date = new Intl.DateTimeFormat('ru-RU').format(new Date()).replace(/\./g, '-');
      const extension = EXTENSION_MAP[contentType];

      this.document.body.append(temporaryLink);

      temporaryLink.href = url;
      temporaryLink.download =
        // eslint-disable-next-line no-useless-escape
        httpResponse.headers.get('content-disposition')?.match(/filename=([\w\.\-_]+);/)?.[1] ??
        `${fallbackName}_${date}.${extension}`;
      temporaryLink.style.display = 'none';
      temporaryLink.click();

      this.window.URL.revokeObjectURL(url);
      temporaryLink.remove();
    }
  }
}

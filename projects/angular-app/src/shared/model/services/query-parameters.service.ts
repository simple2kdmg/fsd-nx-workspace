import { Inject, Injectable } from '@angular/core';
import { debounceTime, filter, map, Observable, shareReplay, startWith } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { DOCUMENT } from '@angular/common';
import { QueryParamMapper } from '../models/query-param-mapper.model';
import { LIST_QUERY_PARAM_SEPARATOR, QUERY_PARAM_KEY_VALUE_SEPARATOR } from '../../lib/constants/separators.const';

@Injectable({ providedIn: 'root' })
export class QueryParametersService {
  public currentUrl$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => event.urlAfterRedirects || event.url),
    startWith(this.document.location.href.split(this.document.location.host)[1]), // Нужно для SSR
    debounceTime(0), // Исключаем лишние эмиты, когда дописываем в URL параметры query один за другим
    shareReplay(1) // Иначе получаем значение предыдущего маршрута из-за startWith
  );

  private readonly mappers = new Map<string, QueryParamMapper<unknown>>();

  private queryParamsUpdateQueue = Promise.resolve(true);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  public registerMapper<P>(mapperId: string, mapper: QueryParamMapper<P>): QueryParametersService {
    this.mappers.set(mapperId, mapper);

    return this;
  }

  public getMappedParams<P>(mapperId: string): Observable<P> {
    if (!this.mappers.has(mapperId)) {
      throw new Error('QueryParametersService was not initialized. Call init before.');
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.activatedRoute.queryParamMap.pipe(map(this.mappers.get(mapperId) as QueryParamMapper<P>));
  }

  public updateQueryParam<P, K extends Extract<keyof P, string> = Extract<keyof P, string>>(
    key: K,
    value: P[K] | null | undefined
  ): Observable<void> {
    this.queryParamsUpdateQueue = this.queryParamsUpdateQueue.then(() =>
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
        queryParams: {
          [key]: value ? this.formatQueryParamValue<P>(value) : null
        },
        queryParamsHandling: 'merge'
      })
    );

    return fromPromise(this.queryParamsUpdateQueue).pipe(map(() => void 0));
  }

  public updateQueryParams<P>(model: Partial<P>): Observable<void> {
    this.queryParamsUpdateQueue = this.queryParamsUpdateQueue.then(() =>
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
        queryParams: this.getParams<P>(model),
        queryParamsHandling: 'merge'
      })
    );

    return fromPromise(this.queryParamsUpdateQueue).pipe(map(() => void 0));
  }

  public getParams<P>(model: Partial<P>): Params {
    const params: Params = {};

    for (const key in model) {
      params[key] = this.formatQueryParamValue(model[key]);
    }

    return params;
  }

  private isKeyValueTypeArray<
    P,
    U extends Array<{
      key: string;
      value: any;
    }>,
  >(value: P[Extract<keyof P, string>] | undefined): value is P[Extract<keyof P, string>] & U {
    return Array.isArray(value) && 'key' in value[0] && 'value' in value[0];
  }

  private formatQueryParamValue<P>(value: P[Extract<keyof P, string>] | undefined): any {
    if (Array.isArray(value) && typeof value[0] !== 'object') {
      return value.map((x) => x.toString()).join(LIST_QUERY_PARAM_SEPARATOR);
    } else if (this.isKeyValueTypeArray(value)) {
      return value
        .filter(({ value }) => value !== null && value !== undefined)
        .map(({ key, value }) => key + QUERY_PARAM_KEY_VALUE_SEPARATOR + value)
        .join(LIST_QUERY_PARAM_SEPARATOR);
    }

    return value ?? null;
  }
}

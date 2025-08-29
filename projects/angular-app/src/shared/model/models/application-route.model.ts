import { Data, ResolveData, ResolveFn, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumbItem } from './breadcrumb-item.model';

export type ApplicationRoute = Omit<Route, 'data' | 'resolve'> & {
  resolve?: ResolveData & {
    breadcrumbs?: ResolveFn<BreadcrumbItem[]>;
    // translations?: ResolveFn<Observable<void> | void>;
    dateTimeOffset?: ResolveFn<void>;
  };
  data?: Data &
    Partial<{
      breadcrumbs: BreadcrumbItem[];
    }>;
};

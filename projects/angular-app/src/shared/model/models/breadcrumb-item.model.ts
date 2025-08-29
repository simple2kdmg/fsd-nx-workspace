import { Observable } from 'rxjs';

export type BreadcrumbItem = {
  key: string;
  resolvedKey?: Observable<string>;
  routerLink?: string;
};

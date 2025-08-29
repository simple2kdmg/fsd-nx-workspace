import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbItem } from '../models/breadcrumb-item.model';
import { ApplicationRoute } from '../models/application-route.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private readonly breadcrumbItemsEmitter$ = new BehaviorSubject<BreadcrumbItem[]>([]);

  public readonly breadcrumbItems$ = this.breadcrumbItemsEmitter$.asObservable();

  constructor(private readonly router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs = this.searchForBreadcrumbsData(root);

      this.breadcrumbItemsEmitter$.next(breadcrumbs);
    });
  }

  private searchForBreadcrumbsData(route: ActivatedRouteSnapshot | null): BreadcrumbItem[] {
    if (route) {
      const routeData = route.data as ApplicationRoute['data'];
      const breadcrumbItems = routeData?.breadcrumbs;

      return breadcrumbItems ?? this.searchForBreadcrumbsData(route.firstChild);
    } else {
      return [];
    }
  }
}

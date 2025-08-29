import { Routes } from '@angular/router';
import { ApplicationPath } from '../shared/model';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ApplicationPath.Default,
        loadComponent: () => import('../pages/default/default-page.component'),
      },
      {
        path: ApplicationPath.Second,
        loadComponent: () =>
          import('../pages/second/second-page.component'),
      },
      {
        path: ApplicationPath.CustomElements,
        loadComponent: () =>
          import('../pages/custom-elements/custom-elements-page.component'),
      },
      {
        path: '',
        redirectTo: `${ApplicationPath.Default}`,
        pathMatch: 'full',
      },
    ],
  },
];

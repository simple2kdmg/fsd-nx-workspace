import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationPath } from '../shared/model';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: ApplicationPath.Default,
                loadChildren: () =>
                    import('../pages/default').then((m) => m.DefaultPageModule),
            },
            {
                path: ApplicationPath.Second,
                loadChildren: () =>
                    import('../pages/second').then((m) => m.SecondtPageModule),
            },
            {
                path: ApplicationPath.CustomElements,
                loadChildren: () =>
                    import('../pages/custom-elements').then(
                        (m) => m.CustomElementsPageModule
                    ),
            },
            {
                path: '',
                redirectTo: `${ApplicationPath.Default}`,
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

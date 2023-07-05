import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DefaultPageComponent } from './default-page.component';
import { CommonModule } from '@angular/common';
import { DefaultPageContentModule } from './ui/default-page-content/default-page-content.module';

const routes: Route[] = [
    {
        path: '',
        component: DefaultPageComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DefaultPageContentModule,
    ],
    declarations: [DefaultPageComponent],
})
export class DefaultPageModule {}

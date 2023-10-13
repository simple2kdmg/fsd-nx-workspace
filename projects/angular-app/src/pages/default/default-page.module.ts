import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DefaultPageComponent } from './default-page.component';
import { CommonModule } from '@angular/common';
import { DefaultPageContentModule } from './ui/default-page-content/default-page-content.module';
import { HostBindingTestModule } from './ui/host-binding-test/host-binding-test.module';

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
        HostBindingTestModule,
    ],
    declarations: [DefaultPageComponent],
})
export class DefaultPageModule {}

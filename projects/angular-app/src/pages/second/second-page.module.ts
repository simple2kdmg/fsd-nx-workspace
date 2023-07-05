import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SecondPageComponent } from './second-page.component';
import { CommonModule } from '@angular/common';

const routes: Route[] = [
    {
        path: '',
        component: SecondPageComponent,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [SecondPageComponent],
})
export class SecondtPageModule {}

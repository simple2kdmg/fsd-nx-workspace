import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CustomElementsPageComponent } from './custom-elements-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    BreakpointsDebugModule,
    CheckOutlineIcon16TestComponent,
    CustomInputDebugModule,
    SvgIconModule,
} from '../../shared/ui';

const routes: Route[] = [
    {
        path: '',
        component: CustomElementsPageComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        CustomInputDebugModule,
        BreakpointsDebugModule,
        CheckOutlineIcon16TestComponent,
        SvgIconModule,
    ],
    declarations: [CustomElementsPageComponent],
})
export class CustomElementsPageModule {}

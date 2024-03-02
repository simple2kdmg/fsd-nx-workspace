import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CustomElementsPageComponent } from './custom-elements-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    BreakpointsDebugModule,
    CheckOutlineIcon16TestComponent,
    CustomInputDebugModule,
    FsdInputTestingModule,
    SvgIconModule,
    XlsxDebugModule,
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
        XlsxDebugModule,
        FsdInputTestingModule,
    ],
    declarations: [CustomElementsPageComponent],
})
export class CustomElementsPageModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationBarModule } from '../features/navigation';
import { BreakpointsModule } from '../shared/model';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, NavigationBarModule, BreakpointsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

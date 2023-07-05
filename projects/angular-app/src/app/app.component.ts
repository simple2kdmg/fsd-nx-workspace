import { Component } from '@angular/core';

@Component({
    selector: 'fsd-angular-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    get initialize(): boolean {
        console.count('app component redrawn');
        return true;
    }
}

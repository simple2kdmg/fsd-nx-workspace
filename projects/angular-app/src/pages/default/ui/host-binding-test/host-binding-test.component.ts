import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    OnInit,
} from '@angular/core';
import {
    fromEvent,
    concatMap,
    interval,
    take,
    switchMap,
    finalize,
    timer,
    tap,
    map,
    Observable,
    Subject,
    delay,
} from 'rxjs';


@Component({
    selector: 'fsd-host-binding-test',
    templateUrl: './host-binding-test.component.html',
    styleUrls: ['./host-binding-test.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostBindingTestComponent {
    @HostBinding('style.color') get color() {
        return this.coloredInRed ? 'red' : '';
    }

    @HostBinding('style.background') background?: string;

    private coloredInRed = false;

    toggleColoring(): void {
        this.coloredInRed = !this.coloredInRed;
    }
}

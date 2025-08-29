import { ChangeDetectionStrategy, Component } from '@angular/core';
import { XlsxService } from '../../model';

@Component({
  standalone: true,
  selector: 'fsd-xlsx-debug',
  styleUrls: ['xlsx-debug.component.less'],
  templateUrl: 'xlsx-debug.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XlsxDebugComponent {
  constructor(private readonly xlsxService: XlsxService) {
  }

  onClick(): void {
    this.xlsxService.exportToXlsx('test');
  }
}

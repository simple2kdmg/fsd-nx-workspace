import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIconComponent } from './svg-icon.component';
import { SvgIconRegistryService } from './svg-icon-registry.service';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { ReplaySubject, throwError } from 'rxjs';
import { By, SafeHtml } from '@angular/platform-browser';
import { SvgIconName, SvgIconSize } from '../../model';

const safeHtmlStub = {} as SafeHtml;

@Component({
  standalone: true,
  imports: [SvgIconComponent],
  template: `<fsd-svg-icon [name]="iconName" [size]="iconSize"></fsd-svg-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  iconName: SvgIconName | null = null;
  iconSize: SvgIconSize = 's';
}

describe('Svg Icon Component', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  let svgIconRegistryServiceMock: SvgIconRegistryService;
  let get$: ReplaySubject<SafeHtml>;

  const getSvgIconComponentInstance = () =>
    fixture.debugElement.query(By.css('zms-svg-icon')).componentInstance as SvgIconComponent;
  const getSvgContainer = () => fixture.debugElement.query(By.css('.svg-container'));

  beforeEach(async () => {
    svgIconRegistryServiceMock = mock(SvgIconRegistryService);
    get$ = new ReplaySubject<SafeHtml>(1);

    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, SvgIconComponent],
      providers: [{ provide: SvgIconRegistryService, useFactory: () => instance(svgIconRegistryServiceMock) }],
    }).compileComponents();

    when(svgIconRegistryServiceMock.get(anything(), anything())).thenReturn(get$);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should not render icon if name is not defined', () => {
    component.iconSize = 's';

    fixture.detectChanges();

    expect(getSvgContainer()).toBeFalsy();
  });

  it('should not render icon if size is not defined', () => {
    component.iconName = 'Search';

    fixture.detectChanges();

    expect(getSvgContainer()).toBeFalsy();
  });

  it('should render icon if name and size are defined', () => {
    component.iconName = 'Search';
    component.iconSize = 's';
    get$.next(safeHtmlStub);

    fixture.detectChanges();

    expect(getSvgContainer()).toBeTruthy();
  });

  it('should not request icon again if inputs are the same', () => {
    component.iconName = 'Search';
    component.iconSize = 's';
    get$.next(safeHtmlStub);

    fixture.detectChanges();

    component.iconSize = 's';

    fixture.detectChanges();

    verify(svgIconRegistryServiceMock.get(anything(), anything())).once();
  });

  it('should request new icon again if name input changes', () => {
    component.iconName = 'Search';
    component.iconSize = 's';
    get$.next(safeHtmlStub);

    fixture.detectChanges();

    component.iconName = 'Delete';

    getSvgIconComponentInstance().ngOnChanges();

    verify(svgIconRegistryServiceMock.get(anything(), anything())).twice();
  });

  it('should request new icon again if size input changes', () => {
    component.iconName = 'Search';
    component.iconSize = 's';
    get$.next(safeHtmlStub);

    fixture.detectChanges();

    component.iconSize = 'm';

    getSvgIconComponentInstance().ngOnChanges();

    verify(svgIconRegistryServiceMock.get(anything(), anything())).twice();
  });

  it('should not render icon if there was error during request', () => {
    component.iconName = 'Search';
    component.iconSize = 's';
    when(svgIconRegistryServiceMock.get(anything(), anything())).thenReturn(throwError(() => new Error('Error!')));

    fixture.detectChanges();

    expect(getSvgContainer()).toBeFalsy();
  });
});

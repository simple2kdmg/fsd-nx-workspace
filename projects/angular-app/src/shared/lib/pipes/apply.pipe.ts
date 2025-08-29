import { Pipe, PipeTransform } from '@angular/core';

export type ApplyMapper<In, Out, InParams extends unknown[] = unknown[]> = (...fnArgs: [In, ...InParams]) => Out;

@Pipe({
  name: 'fsdApply',
  standalone: true,
})
/**
 * Impure pipe для использования геттеров и метдоов/функций при расчете значений в щаблоне компонента. Позволяет
 * избежать излишних вызовов на каждый `tick()` ангуляра за счет того, что пересчет функции происходит только если
 * меняется значение примитива `value` или ссылка на объект `value`.
 *
 * Пример использования:
 *
 * Задать свой мэппер:
 * ```typescript
 * @Component({
 *    ...
 * })
 * export class FooComponent {
 *    public readonly myMapper: ApplyMapper<FooItem, string> = (item) => item.name;
 *
 *    public readonly items$: Observable<FooItem[]> = this.fooService.getItems();
 *
 *    constructor(private readonly fooService: FooService) {}
 * }
 * ```
 * В шаблоне:
 * ```html
 * @for (item of items$ | async) {
 *    <bar [parameter]="item | fsdApply : myMapper"></bar>
 * }
 * ```
 * */
export class ApplyPipe implements PipeTransform {
  public transform<In, Out, InParams extends unknown[] = unknown[]>(
    value: In,
    fn: ApplyMapper<In, Out, InParams>,
    ...args: InParams
  ): Out {
    return fn(value, ...args);
  }
}

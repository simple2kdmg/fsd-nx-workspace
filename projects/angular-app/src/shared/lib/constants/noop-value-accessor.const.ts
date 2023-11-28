import { Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { EMPTY_FUNC } from './empty.const';

class NoopValueAccessor implements ControlValueAccessor {
  writeValue = EMPTY_FUNC;
  registerOnChange = EMPTY_FUNC;
  registerOnTouched = EMPTY_FUNC;
}

const noopValueAccessorInstance = new NoopValueAccessor();

export const NOOP_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useValue: noopValueAccessorInstance,
};

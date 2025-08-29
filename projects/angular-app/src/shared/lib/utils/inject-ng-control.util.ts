import { inject } from '@angular/core';
import { FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';

export function injectNgControl(): FormControlDirective | FormControlName | NgModel | never {
  const ngControl = inject(NgControl, { self: true, optional: true });

  if (!ngControl) throw new Error('ngControl was not found.');

  if (
    ngControl instanceof FormControlDirective ||
    ngControl instanceof FormControlName ||
    ngControl instanceof NgModel
  ) {
    return ngControl;
  }

  throw new Error('ngControl should be instance of FormControlDirective, FormControlName or NgModel');
}

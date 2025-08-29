import { isPlatformBrowser, isPlatformServer } from '@angular/common';

interface PlatformAware {
  platformId: object;
}

interface FunctionDecorator<T> {
  (target: T, propertyKey: string, descriptor: PropertyDescriptor): void;
}

export const BrowserOnly = (defaultValue: any = void 0): FunctionDecorator<PlatformAware> => {
  return function (target: PlatformAware, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalFn = descriptor.value;
    descriptor.value = function (this: PlatformAware, ...args: any[]): any {
      return isPlatformBrowser(this.platformId) ? originalFn.call(this, ...args) : defaultValue;
    };
  };
};

export const ServerOnly = (defaultValue: any = void 0): FunctionDecorator<PlatformAware> => {
  return function (target: PlatformAware, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalFn = descriptor.value;
    descriptor.value = function (this: PlatformAware, ...args: any[]): any {
      return isPlatformServer(this.platformId) ? originalFn.call(this, ...args) : defaultValue;
    };
  };
};

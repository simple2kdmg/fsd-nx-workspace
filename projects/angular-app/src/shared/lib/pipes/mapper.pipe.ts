import { Pipe, PipeTransform } from '@angular/core';

// Taken from TaigaUi. How to use: https://taiga-ui.dev/pipes/mapper

/**
 * Typed mapping function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FsdMapper<T, G> = (item: T, ...args: any[]) => G;

@Pipe({ name: `fsdMapper` })
export class FsdMapperPipe implements PipeTransform {
    /**
     * Maps object to an arbitrary result through a mapper function
     *
     * @param value an item to transform
     * @param mapper a mapping function
     * @param args arbitrary number of additional arguments
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform<T, G>(value: T, mapper: FsdMapper<T, G>, ...args: any[]): G {
        return mapper(value, ...args);
    }
}

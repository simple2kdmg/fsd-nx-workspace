import { Breakpoint, BreakpointKey } from '../../model';

export const BREAKPOINTS: Readonly<
    Record<BreakpointKey, Breakpoint>
> = {
    xs: {key: 'xs', fromW: 0, upToW: 360},
    sm: {key: 'sm', fromW: 360, upToW: 768},
    md: {key: 'md', fromW: 768, upToW: 1024},
    lg: {key: 'lg', fromW: 1024, upToW: 1280},
    xl: {key: 'xl', fromW: 1280, upToW: 1440},
    xxl: {key: 'xxl', fromW: 1440, upToW: 1920},
    xxxl: {key: 'xxxl', fromW: 1920, upToW: Infinity},
};

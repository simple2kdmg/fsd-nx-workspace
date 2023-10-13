export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export type Breakpoint = Readonly<{
    key: BreakpointKey;
    fromW: number;
    upToW: number;
}>;

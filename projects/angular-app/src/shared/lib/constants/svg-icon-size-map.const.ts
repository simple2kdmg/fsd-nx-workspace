import { SvgIconSize } from '../../model';

export const SVG_ICON_SIZE_MAP: Record<SvgIconSize, string> = {
    xs: '12px',
    s: '16px',
    m: '20px',
    l: '16px', // we will apply scale(2) because currently there is no icon for 32px size
};

import { Params } from '@angular/router';

export type UpdateRouteProps = Readonly<{
    url: string | string[];
    queryParams?: Params;
}>;

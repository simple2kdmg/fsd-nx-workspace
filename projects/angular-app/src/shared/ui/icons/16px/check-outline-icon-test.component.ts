import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'fsd-check-outline-icon-test',
    styles: [':host: { display: inline-block; width: 16px; height: 16px; }'],
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '[class.fsd-icon]': 'true',
    },
    template: `
        <svg
            width="16"
            height="17"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#a)">
                <path
                    d="m6.667 11.187 5.675-5.32-.684-.73-4.991 4.68-2.325-2.18-.684.73 3.009 2.82z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 8.502a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path transform="translate(0 .502)" d="M0 0h16v16H0z" />
                </clipPath>
            </defs>
        </svg>
    `,
})
export class CheckOutlineIcon16TestComponent {}

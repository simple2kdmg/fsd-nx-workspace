import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'fsd-check-outline-icon',
    template: `
        <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#un14ur0g8a)" [attr.fill]="fill">
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
                <clipPath id="un14ur0g8a">
                    <path
                        [attr.fill]="fill"
                        transform="translate(0 .502)"
                        d="M0 0h16v16H0z"
                    />
                </clipPath>
            </defs>
        </svg>
    `,
})
export class CheckOutlineIcon16Component {
    @Input()
    fill = '#000';
}

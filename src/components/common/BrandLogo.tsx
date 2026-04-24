import * as React from 'react';

export type BrandLogoProps = Omit<React.SVGProps<SVGSVGElement>, 'children'> & {
    title?: string;
};

/**
 * Logotype for the Stripe Testing demo app; wordmark and mark use Stripe-style blurple.
 */
export default function BrandLogo({
    title = 'Stripe Testing',
    ...svgProps
}: BrandLogoProps): JSX.Element {
    const titleId = React.useId();

    return (
        <svg
            viewBox="0 0 400 96"
            role="img"
            aria-labelledby={titleId}
            xmlns="http://www.w3.org/2000/svg"
            {...svgProps}
        >
            <title id={titleId}>{title}</title>
            <defs>
                <linearGradient id="st-blurple" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#7A73FF" />
                    <stop offset="0.5" stopColor="#635BFF" />
                    <stop offset="1" stopColor="#4B44CC" />
                </linearGradient>
                <filter id="st-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0A2540" floodOpacity="0.2" />
                </filter>
            </defs>

            <g filter="url(#st-shadow)">
                <rect x="8" y="8" width="80" height="80" rx="18" fill="url(#st-blurple)" />
                <path
                    d="M28 48h20c2.2 0 4 1.8 4 4s-1.8 4-4 4H28c-2.2 0-4-1.8-4-4s1.8-4 4-4Z"
                    fill="rgba(255,255,255,0.95)"
                />
                <path
                    d="M40 32h20c2.2 0 4 1.8 4 4v8c0 2.2-1.8 4-4 4H40c-2.2 0-4-1.8-4-4V36c0-2.2 1.8-4 4-4Z"
                    fill="rgba(255,255,255,0.35)"
                />
            </g>

            <g transform="translate(104 20)">
                <text
                    x="0"
                    y="36"
                    fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                    fontSize="30"
                    fontWeight="800"
                    letterSpacing="-0.5px"
                    fill="#FFFFFF"
                >
                    Stripe
                    <tspan fill="rgba(255,255,255,0.78)" fontWeight="700">
                        {' '}
                        Testing
                    </tspan>
                </text>
                <path d="M0 48h256" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
            </g>
        </svg>
    );
}

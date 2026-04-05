import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="13" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 13C11 13 13 16 16 16C19 16 21 13 21 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 8V18" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <path d="M10 22L16 25L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// что тут происходит за хуйня

declare module '*.svg' {
    import { ReactElement, SVGProps } from 'react';
    const content: ReactElement<SVGProps<SVGElement>>;
    export default content;
}

declare const VITE_IS_DEV: boolean;

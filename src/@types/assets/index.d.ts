declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}

declare const window: Window &
  typeof globalThis & {
    env: unknown;
  };

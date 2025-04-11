export { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: {
        cacheStrategy: string;
        description: string;
        output: string;
        [key: string]: any;
      };
    }

    interface ElementChildrenAttribute {
      children: {}; // supports `children` prop
    }
  }
}

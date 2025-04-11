export { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: {
        cacheStrategy: "force-cache" | "none";
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

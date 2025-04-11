export { }

declare global {
  function createComponent(
    tag: string,
    props: ComponentOptions,
    ...children: Component[]
  ): Component;

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

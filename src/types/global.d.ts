import { type Component, type ComponentOptions } from "./exgen"

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
        cacheStrategy?: "none" | "force-cache";
        description: string;
        output: string;
      }
    }
  }
}

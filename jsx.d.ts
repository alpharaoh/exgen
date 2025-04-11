declare namespace JSX {
  // Allow any tag name with any props.
  interface IntrinsicElements {
    [elemName: string]: string;
  }
}

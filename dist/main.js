function createComponent(tag, props, ...children) {
  console.log(tag, props, children);
}
const hello = createComponent(Application, {
  cacheStrategy: "force-cache",
  description: "Application shell",
  output: "An application with a sidebar with 3 items (home, data, settings). It should also have room for children {{Table}}"
}, createComponent(Table, {
  cacheStrategy: "none",
  description: "A table component",
  output: "A table component with a header and 3 rows"
}));
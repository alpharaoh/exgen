import exgen from "./exgen.js";
function createComponent(tag, props, ...children) {
  const output = exgen.component({
    cacheStrategy: props.cacheStrategy,
    name: tag,
    description: props.description,
    output: props.output
  });
  for (const child of children) {
    output.addChild(child);
  }
  return output;
}
const hello = createComponent(Application, {
  cacheStrategy: "force-cache",
  description: "Application shell",
  output: "An application with a sidebar with 3 items (home, data, settings). It should also have room for children {{Table}}"
}, createComponent(Table, {
  cacheStrategy: "none",
  description: "A table component",
  output: "A table component with a header and 3 rows"
}, "Hello, world!"));
console.log(await hello.run());
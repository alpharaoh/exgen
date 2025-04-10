import exgen from "./exgen.ts"

const App = exgen.component({
  cacheStrategy: "force-cache",
  name: "application",
  description: "Application shell",
  output: "An application with a sidebar with 3 items (home, data, settings)",
})

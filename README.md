### Exgen

Creating a LLM generated HTML for each request + backend implementation

Backends are largely managing, transforming, and storing data. This can be done by an LLM.

This is a good paradigm that is different from lovable and the others. This is dynamic, and it is not static.

Possible use cases:

- Displaying dynamic data and allowing users to interact with it how they want

Syntax:

```js
const dbTool = exgen.tool({
    databaseUrl: "postgres://localhost:5432/mydb",
    schemaDescription: "It has a users table, posts table, comments table",
})

const TableData = exgen.component({
    cacheStrategy: "none", // Always regenerate on every request
    name: "Graph display",
    description: "Displays a graph of data of financial statements",
    inputs: z.array(
        z.object({
            name: z.string(),
            description: z.string(),
            type: z.enum(["string", "number", "json"]),
        })
    ),
    tools: [dbTool],
    output: "a graph",
})

const Application = exgen.component({
    cacheStrategy: "force-cache", // Default: Generate once and store
    name: "application", 
    description: "Application shell",
    output: "An application with a sidebar with 3 items (home, data, settings)",
})

export default exgen.app(() => (
  <AppShell>
    <GraphDisplay />
  </AppShell>
))
```


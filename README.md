## Exgen

Exgen enables dynamic, backend-driven HTML generation using Large Language Models (LLMs) to build web applications. Unlike traditional static frontends, Exgen leverages LLMs to handle both the backend logic and HTML generation in real-time, offering a flexible, evolving framework where the backend and frontend are more integrated.

Syntax:
```js
import exgen from "exgen"

const dbTool = exgen.tool({
    databaseUrl: "postgres://localhost:5432/mydb",
    schemaDescription: "It has a users table, posts table, comments table",
})

const Table = exgen.component({
  name: "Table",
  output: "Displays a table of posts",
  tools: [dbTool],
  cacheStrategy: "none", // This table component will be regenerated for every request
})

const App = exgen.component({
  name: "Application",
  output: "An application with a sidebar and table",
  cacheStrategy: "force-cache", // This component will be generated once and cached for future requests
})

App.addChild(Table)

const htmlContent = await App.run() // Use `res.send(htmlContent)` to send the HTML to the client from the server
  
```


Exgen dynamically generates HTML based on component definitions and interactions, allowing the LLM to handle complex data retrieval, processing, and UI rendering in real-time. This approach redefines the traditional web development model, where the backend directly manages both the logic and the UI.

import express from "express"
import exgen from "./exgen.ts"

const app = express()
const port = 3000

app.get("/", async (_, res) => {
  const App = exgen.component({
    cacheStrategy: "force-cache",
    name: "Application",
    description: "Application shell",
    output: "An application with a sidebar with 3 items (home, data, settings). It should also have room for children {{Table}}",
  })

  const Table = exgen.component({
    cacheStrategy: "none",
    name: "Table",
    description: "A table component",
    output: "A table component with a header and 3 rows",
  })

  App.addChild(Table)

  const htmlContent = await App.run()

  res.send(htmlContent)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

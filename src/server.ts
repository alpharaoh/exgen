import express from "express"
import exgen from "./exgen.ts"
import { z } from "zod"

const app = express()
const port = 3000

app.get("/", async (_, res) => {
  const App = exgen.component({
    cacheStrategy: "none",
    name: "application",
    description: "Application shell",
    output: "An application with a sidebar with 3 items (home, data, settings)",
  })

  const Table = exgen.component({
    cacheStrategy: "force-cache",
    name: "Table",
    description: "A table component",
    output: "A table component with a header and 3 rows",
    inputs: z.array(z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
    })),
  })

  App.addChild(Table)

  const htmlContent = await App.run()

  res.send(htmlContent)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

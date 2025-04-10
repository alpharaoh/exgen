import express from "express"
import exgen from "./exgen.ts"

const app = express()
const port = 3000

app.get("/", async (_, res) => {
  const App = exgen.component({
    cacheStrategy: "force-cache",
    name: "application",
    description: "Application shell",
    output: "An application with a sidebar with 3 items (home, data, settings)",
  })

  const htmlContent = await App.run()

  res.send(htmlContent)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

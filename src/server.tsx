import express from "express"
import './exgen.ts'

const app = express()
const port = 3000

app.get("/", async (_, res) => {
  const app = (
    <Application
      cacheStrategy="force-cache"
      description="Application shell"
      output="An application with a sidebar with 3 items (home, data, settings). It should also have room for children {{Table}}"
    >
      <Table
        description="A table component"
        output="A table component with a header and 3 rows"
      />
    </Application>
  )

  const htmlContent = await app.run()

  res.send(htmlContent)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

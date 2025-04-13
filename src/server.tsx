import express from "express"
import exgen from './exgen/index.ts'

const app = express()
const port = 3000

const dbTool = exgen.tool({})

app.get("*", async (_, res) => {
  const app = (
    <application
      cacheStrategy="force-cache"
      description="Main application layout with a sidebar and dynamic children"
      output="A responsive application shell with a fixed sidebar containing 3 items: Home, Data, and Settings. It should also have a main content area."
    >
      <stats-card
        cacheStrategy="none"
        description="Displays a key metric with context"
        output="A statistics card showing a metric labeled 'Conversion Rate' with the value '10%' and a subtext indicating improvement from the previous week."
        tools={[dbTool]}
      />
      <table
        cacheStrategy="none"
        description="Renders structured data in rows and columns"
        output="A table component with 3 columns: Name, Age, and Email. Include 3 sample rows of realistic data. Add a header row with bold labels."
      />
    </application>
  )

  const htmlContent = await app.run()

  res.send(htmlContent)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

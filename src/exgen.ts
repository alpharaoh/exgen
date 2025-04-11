import { z } from "zod"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const cache: Record<string, string> = {}

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
})

interface ComponentOptions {
  cacheStrategy: "none" | "force-cache",
  name: string,
  description: string,
  output: string,
  inputs?: z.ZodType,
}

const promptTemplate = `
You are an expert at building software. You will be given a component spec and you must return the HTML for the component given the spec.

The component spec is a JSON object with the following keys:

- name: The name of the component
- description: A description of the component
- output: The output of the component (What the final HTML should look like)

<example>

input:
{
  "name": "Table display with 10 rows of people",
  "description": "Displays a table of 10 people from a mock salesforce",
  "output": "a table of 10 people. Make sure to include a header",
}

output:
\`\`\`html
<div>
  <h1>Table display with 10 rows of people</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john.doe@example.com</td>
        <td>123-456-7890</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>jane.smith@example.com</td>
        <td>987-654-3210</td>
      </tr>
      <tr>
        <td>Bob Johnson</td>
        <td>bob.johnson@example.com</td>
        <td>555-123-4567</td>
      </tr>
      <tr>
        <td>Alice Williams</td>
        <td>alice.williams@example.com</td>
        <td>765-432-2109</td>
      </tr>
      <tr>
        <td>David Lee</td>
        <td>david.lee@example.com</td>
        <td>321-987-6543</td>
      </tr>
      <tr>
        <td>Emily Brown</td>
        <td>emily.brown@example.com</td>
        <td>876-543-2198</td>
      </tr>
      <tr>
        <td>Michael Green</td>
        <td>michael.green@example.com</td>
        <td>654-321-0987</td>
      </tr>
      <tr>
        <td>Sarah Lee</td>
        <td>sarah.lee@example.com</td>
        <td>432-987-6543</td>
      </tr>
      <tr>
        <td>Olivia White</td>
        <td>olivia.white@example.com</td>
        <td>543-210-9876</td>
      </tr>
      <tr>
        <td>Jessica Black</td>
        <td>jessica.black@example.com</td>
        <td>321-654-9876</td>
      </tr>
    </tbody>
  </table>
</div>    
\`\`\`

</example>

Produce the HTML for this. Make sure it's beatiful and well formatted. (use CSS)
`

class Component {
  options: ComponentOptions
  children: Component[]

  constructor(options: ComponentOptions, children: Component[] = []) {
    this.options = options
    this.children = children
  }

  addChild(child: Component) {
    this.children.push(child)
  }

  async run() {
    console.log(cache)
    const hasChildren = this.children.length > 0

    let prompt = promptTemplate
    if (hasChildren) {
      prompt += `
<important>
The following components are children of this component:
${this.children.map(child => `{{${child.options.name}}}`).join("\n")}. 

You must return the HTML for this component with all of it's children. These children should be in tags.

e.g. <div>{{Table}}</div>
</important>`
    }

    const isCached = cache[this.options.name]

    let rawResponse: string
    if (isCached) {
      rawResponse = isCached
    } else {
      const response = await client.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: JSON.stringify(this.options) },
        ],
      })
      rawResponse = response.choices[0].message.content ?? ""

      if (this.options.cacheStrategy === "force-cache") {
        cache[this.options.name] = rawResponse
      }
    }

    let parsedResponse = rawResponse.replace(/```html\s*([\s\S]*?)\s*```/, "$1")

    if (hasChildren) {
      for (const child of this.children) {
        const isCached = cache[child.options.name]

        const childResponse = isCached ? isCached : await child.run()

        if (child.options.cacheStrategy === "force-cache") {
          cache[child.options.name] = childResponse
        }

        // Replace the childs tag with the actual HTML
        parsedResponse = parsedResponse.replace(new RegExp(`{{${child.options.name}}}`, "g"), childResponse)
      }
    }

    return parsedResponse
  }
}

class Exgen {
  component(options: ComponentOptions) {
    return new Component(options)
  }
}

const exgen = new Exgen()
export default exgen

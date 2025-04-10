import { z } from "zod"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

interface ComponentOptions {
  cacheStrategy: "none" | "force-cache",
  name: string,
  description: string,
  output: string,
  inputs?: z.ZodType[],
}

const prompt = `
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

</example>

Produce the HTML for this:
`

class Component {
  options: ComponentOptions

  constructor(options: ComponentOptions) {
    this.options = options
  }

  async run() {
    // placeholder
    const response = await client.responses.create({
      model: "gpt-4o",
      input: prompt + JSON.stringify(this.options),
      text: {
        format: {
          type: "json_schema",
          name: "html_gen",
          description: "Dynamically generated HTML UI",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["html"],
            properties: {
              html: {
                type: "string",
                description: "The full HTML for the component",
              }
            },
          },
        },
      },
    })

    const parsedResponse = JSON.parse(response.output_text)

    console.log(parsedResponse)

    return parsedResponse.html
  }
}

class Exgen {
  component(options: ComponentOptions) {
    return new Component(options)
  }
}

const exgen = new Exgen()
export default exgen

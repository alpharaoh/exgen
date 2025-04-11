import { z } from "zod"
import dotenv from "dotenv"
import OpenAI from "openai"

import { promptTemplate } from "./prompt.ts"

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
        const childResponse = await child.run()

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

function createComponent(tag: string, props: ComponentOptions, ...children: Component[]) {
  const output = exgen.component({
    cacheStrategy: props.cacheStrategy || "none",
    name: tag,
    description: props.description,
    output: props.output,
  })

  for (const child of children) {
    output.addChild(child)
  }

  return output
}

(globalThis as any).createComponent = createComponent

const exgen = new Exgen()
export default exgen

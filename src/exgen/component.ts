import OpenAI from "openai"

import { childrenPromptTemplate, promptTemplate } from "../prompt.ts"
import { type ComponentOptions } from "../types/exgen"

const cache: Record<string, string> = {}

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
})

export class Component {
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
      prompt += childrenPromptTemplate(this.children.map(child => child.options.name))
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


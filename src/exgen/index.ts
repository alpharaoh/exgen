import dotenv from "dotenv"

dotenv.config()

import { type ComponentOptions, type ToolOptions } from "../types/exgen"
import { Component } from "./component.ts"
import { Tool } from "./tool.ts"

class Exgen {
  component(options: ComponentOptions) {
    return new Component(options)
  }
  tool(options: ToolOptions) {
    return new Tool(options)
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

globalThis.createComponent = createComponent

const exgen = new Exgen()
export default exgen

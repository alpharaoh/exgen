import { z } from "zod"

export interface ComponentOptions {
  cacheStrategy: "none" | "force-cache",
  name: string,
  description: string,
  output: string,
  inputs?: z.ZodType,
}

export interface Component {
  options: ComponentOptions,
  children: Component[],

  addChild(child: Component): void,
  run(): Promise<string>,
}

export interface Tool {
  options: ToolOptions,
}

import { type ToolOptions } from "../types/exgen"

export class Tool {
  options: ToolOptions

  constructor(options: ToolOptions) {
    this.options = options
  }
}

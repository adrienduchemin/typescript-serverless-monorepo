/* eslint-disable @typescript-eslint/no-explicit-any */
export class EventError extends Error {
  [key: string]: any
  constructor(message: string, details?: Record<string, any>) {
    super(message)
    if (details) {
      for (const [key, value] of Object.entries(details)) {
        this[key] = value
      }
    }
  }
}

export class EventError extends Error {
  [key: string]: unknown

  constructor(message: string, details?: Record<string, unknown>) {
    super(message)
    if (details) {
      for (const [key, value] of Object.entries(details)) {
        this[key] = value
      }
    }
  }
}

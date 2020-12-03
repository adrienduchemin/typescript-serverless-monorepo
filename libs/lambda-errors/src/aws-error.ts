/* eslint-disable @typescript-eslint/no-explicit-any */
import { AWSError } from 'aws-sdk'

export class AWSBaseError extends Error implements AWSError {
  code: string
  originalMessage: string
  statusCode?: number
  time: Date

  constructor(message: string, error: AWSError) {
    super(message)
    this.originalMessage = error.message
    this.code = error.code
    this.statusCode = error.statusCode
    this.time = error.time
  }
}

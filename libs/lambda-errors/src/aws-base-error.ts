/* eslint-disable @typescript-eslint/no-explicit-any */
import { AWSError } from 'aws-sdk'

export class AWSBaseError extends Error {
  awsCode: string
  awsMessage: string
  awsStatusCode?: number

  constructor(message: string, error: AWSError) {
    super(message)
    this.awsMessage = error.message
    this.awsCode = error.code
    this.awsStatusCode = error.statusCode
  }
}

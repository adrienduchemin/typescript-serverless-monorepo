/* eslint-disable @typescript-eslint/no-explicit-any */
import { AWSError } from 'aws-sdk'

import { AWSBaseError } from './aws-base-error'

export class DynamoDBError extends AWSBaseError {
  constructor(error: AWSError) {
    super('DynamoDB Error', error)
  }
}

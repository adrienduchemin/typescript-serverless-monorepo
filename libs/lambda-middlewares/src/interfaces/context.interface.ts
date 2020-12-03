import { DynamoDBClient } from '@mimir/dynamodb'
import { Context } from 'aws-lambda'

import { IEventBridgeInjectorConfig } from '../eventbridge-injector'

export interface IContext extends Context {
  traceId?: string
  dynamodb?: DynamoDBClient
  eventbridge?: IEventBridgeInjectorConfig
}

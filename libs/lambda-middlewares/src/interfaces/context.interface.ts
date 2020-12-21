import { DynamoDBClient } from '@mimir/dynamodb'
import { EventBridgeClient } from '@mimir/eventbridge'
import { Context } from 'aws-lambda'

export interface IContext extends Context {
  traceId?: string
  dynamoDB?: DynamoDBClient
  eventBridge?: EventBridgeClient
}

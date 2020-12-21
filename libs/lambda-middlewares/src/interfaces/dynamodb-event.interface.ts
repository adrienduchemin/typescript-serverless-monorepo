import { IEventBridgeEntry } from '@mimir/eventbridge'
import { DynamoDBStreamEvent } from 'aws-lambda'

export interface IDynamoDBEvent<T> extends DynamoDBStreamEvent {
  body: IEventBridgeEntry<T>[]
}

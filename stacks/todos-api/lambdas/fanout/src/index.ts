import middy from '@middy/core'
import {
  eventErrorHandler,
  EventBridgeInjector,
  IInjectedContext,
  traceInjector,
} from '@mimir/lambda-middlewares'
import { DynamoDBStreamEvent } from 'aws-lambda'

import { handle } from './main'
import { eventBridgeInjectorConfig } from './options'

const fanout = async (
  event: DynamoDBStreamEvent, //IDynamoDBParsedEvent<ICreateTodo>
  context: IInjectedContext
): Promise<void> => {
  console.log('Handling lambda', { event, context })
  await handle(event, context.config!)
}

export const handler = middy(fanout)
  .use(eventErrorHandler()) // so it's the last to execute error
  // .use(dynamoDBEventRecordsParser())
  .use(traceInjector())
  .use(EventBridgeInjector(eventBridgeInjectorConfig))

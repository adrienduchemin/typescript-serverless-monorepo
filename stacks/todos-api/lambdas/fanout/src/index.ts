import middy from '@middy/core'
import {
  eventErrorHandler,
  eventBridgeInjector,
  IContext,
  traceInjector,
  IDynamoDBEvent,
  dynamoDBBodyParser,
} from '@mimir/lambda-middlewares'

import { ITodo } from '../../../../../models/src'
// import { DynamoDBStreamEvent } from 'aws-lambda'

import { eventBridgeInjectorConfig, traceInjectorConfig } from './config'
import { handle } from './main'

const fanout = async (
  event: IDynamoDBEvent<ITodo>,
  context: IContext
): Promise<void> => {
  console.log('Handling lambda', { event, context })
  await handle(event.body, context)
}

export const handler = middy(fanout)
  .use(dynamoDBBodyParser<ITodo>())
  .use(traceInjector(traceInjectorConfig))
  .use(eventBridgeInjector(eventBridgeInjectorConfig))
  .use(eventErrorHandler())

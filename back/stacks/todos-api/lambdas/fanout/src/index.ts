import { IInjectedContext, traceInjector } from '@middlewares'
import middy from '@middy/core'
import { DynamoDBStreamEvent } from 'aws-lambda'

import { initConfig } from './init'
import { handle } from './main'

const config = initConfig()

const fanout = async (
  event: DynamoDBStreamEvent,
  context: IInjectedContext
): Promise<void> => {
  console.log('Handling lambda', { event, context })
  try {
    await handle(event, config)
  } catch (err) {
    console.error(err)
  }
}

export const handler = middy(fanout).use(traceInjector())

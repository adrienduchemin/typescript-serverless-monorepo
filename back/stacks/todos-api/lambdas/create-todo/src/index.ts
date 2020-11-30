import { IContextWithConfig, instanceId } from '@middlewares'
import middy from '@middy/core'
import { ITodo } from '@types'
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'

import { initConfig } from './init'
import {
  handle,
  HttpError,
  HttpInternalServerError,
  IAPIGatewayErrorPayload,
} from './main'

// let config: IConfig
// if init has async
// const initConfigPromise = initConfig()
// and remove next line
const config = initConfig()

const createTodo = async (
  event: APIGatewayProxyEventV2,
  context: IContextWithConfig
): Promise<APIGatewayProxyResultV2<ITodo>> => {
  // if (!initResult) {
  //   // be sure that init as finished
  //   config = await initConfigPromise
  // }
  console.log('Handling lambda', { event, context })
  try {
    const response = await handle(event, config)
    return response
  } catch (err) {
    console.error(err)

    let httpError: HttpError = err
    if (!(err instanceof HttpError)) {
      httpError = new HttpInternalServerError({
        error: 'Oops, Something Went Wrong',
        trace: process.env.NODE_ENV !== 'production' ? err : undefined,
      })
    }
    const { statusCode, message, details } = httpError
    const payload: IAPIGatewayErrorPayload = { statusCode, message, ...details }

    return {
      statusCode,
      body: JSON.stringify(payload, null, 4),
    }
  }
}

export const handler = middy(createTodo)
handler.use(instanceId())

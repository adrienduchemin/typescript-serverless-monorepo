import { dbInjector, IInjectedContext, traceInjector } from '@middlewares'
import middy from '@middy/core'
import { ITodo } from '@types'
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'

import {
  handle,
  HttpError,
  HttpInternalServerError,
  IAPIGatewayErrorPayload,
} from './main'
import { dbInjectorOptions } from './options'

const createTodo = async (
  event: APIGatewayProxyEventV2,
  context: IInjectedContext
): Promise<APIGatewayProxyResultV2<ITodo>> => {
  console.log('Handling lambda', { event, context })
  try {
    return await handle(event, context.config!)
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
  .use(traceInjector())
  .use(dbInjector(dbInjectorOptions))

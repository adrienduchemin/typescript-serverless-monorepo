import {
  apiGatewayEventParser,
  dynamoDBInjector,
  IInjectedContext,
  IAPIGatewayParsedEvent,
  traceInjector,
} from '@middlewares'
import middy from '@middy/core'
import { ICreateTodoDto, ITodo } from '@types'
import { APIGatewayProxyResultV2 } from 'aws-lambda'

import {
  handle,
  HttpError,
  HttpInternalServerError,
  IAPIGatewayErrorPayload,
} from './main'
import { dynamoDBInjectorOptions } from './options'

const createTodo = async (
  event: IAPIGatewayParsedEvent<ICreateTodoDto>,
  context: IInjectedContext
): Promise<APIGatewayProxyResultV2<ITodo>> => {
  console.log('Handling lambda', { event, context })
  try {
    return await handle(event.body, context.config!)
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
  .use(apiGatewayEventParser())
  .use(traceInjector())
  .use(dynamoDBInjector(dynamoDBInjectorOptions))

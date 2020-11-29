import { generateInstanceId } from '@lambda-utils'
import { ITodo } from '@shared-types'
import { APIGatewayProxyHandlerV2 } from 'aws-lambda'

import { initConfig } from './init'
import {
  handle,
  HttpError,
  HttpInternalServerError,
  IAPIGatewayErrorPayload,
} from './main'

const instanceId: string = generateInstanceId()

// let config: IConfig
// if init has async
// const initConfigPromise = initConfig()
// and remove next line
const config = initConfig()

export const handler: APIGatewayProxyHandlerV2<ITodo> = async (
  event,
  context
) => {
  // if (!initResult) {
  //   // be sure that init as finished
  //   config = await initConfigPromise
  // }
  console.log('Handling lambda', { event, context, instanceId })
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

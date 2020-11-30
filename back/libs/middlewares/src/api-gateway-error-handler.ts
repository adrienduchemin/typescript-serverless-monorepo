/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { APIGatewayProxyResultV2 } from 'aws-lambda'
import createError, { HttpError } from 'http-errors'

export const apiGatewayErrorHandler = (): middy.MiddlewareObject<
  any,
  APIGatewayProxyResultV2<any>
> => {
  return {
    onError: (handler, next) => {
      let error = handler.error as HttpError

      if (!createError.isHttpError(error)) {
        console.error('Unexpected error', { error })
        error = createError(500, 'Oops, Something Went Wrong')
      }

      handler.response = {
        statusCode: error.statusCode,
        body: JSON.stringify(error, null, 4),
      }
      next()
    },
  }
}

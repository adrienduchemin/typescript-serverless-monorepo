/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { APIGatewayProxyResultV2 } from 'aws-lambda'
import createHttpError, { HttpError } from 'http-errors'

export const httpErrorHandler = (): middy.MiddlewareObject<
  any,
  APIGatewayProxyResultV2<any>
> => {
  return {
    onError: (handler, next) => {
      let error = handler.error as HttpError

      console.error(error)

      if (!createHttpError.isHttpError(error)) {
        error = createHttpError(500, 'Oops, something went wrong')
      }

      handler.response = {
        statusCode: error.statusCode,
        body: JSON.stringify(error, null, 4),
      }
      next()
    },
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
// import { APIGatewayProxyResultV2 } from 'aws-lambda'

// reponse should be typed
export const httpResponseHandler = <T>(): middy.MiddlewareObject<any, any> => {
  return {
    after: (handler, next) => {
      const response = handler.response as T

      handler.response = {
        statusCode: 200,
        body: JSON.stringify(response, null, 4),
      }

      next()
    },
  }
}

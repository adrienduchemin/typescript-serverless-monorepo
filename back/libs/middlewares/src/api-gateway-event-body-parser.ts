/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import createError from 'http-errors'

import { IAPIGatewayParsedEvent } from './api-gateway-parsed-event'

export const apiGatewayEventBodyParser = (): middy.MiddlewareObject<
  IAPIGatewayParsedEvent<string | any>,
  any
> => {
  return {
    before: (handler, next) => {
      const { body } = handler.event

      if (!body) {
        throw createError(400, 'Body required')
      }

      handler.event.rawBody = body

      try {
        handler.event.body = JSON.parse(body)
      } catch (err) {
        throw createError(400, 'Invalid JSON')
      }

      // in another file, should parse and normalize headers

      next()
    },
  }
}

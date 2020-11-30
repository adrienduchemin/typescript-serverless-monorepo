/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import createError from 'http-errors'

import { IAPIGatewayParsedEvent } from './api-gateway-parsed-event'

export const apiGatewayEventParser = (): middy.MiddlewareObject<
  IAPIGatewayParsedEvent<string | any>,
  any
> => {
  return {
    before: (handler, next) => {
      const { body } = handler.event

      if (!body) {
        throw new createError.BadRequest('Body required')
      }

      handler.event.rawBody = body

      try {
        handler.event.body = JSON.parse(body)
      } catch (err) {
        throw new createError.UnprocessableEntity('Invalid JSON')
      }

      // could normalize / parse headers

      next()
    },
  }
}

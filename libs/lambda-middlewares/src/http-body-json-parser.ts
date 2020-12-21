/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import createHttpError from 'http-errors'

import { IAPIGatewayEvent } from './interfaces/api-gateway-event.interface'

export const httpBodyJsonParser = <T>(): middy.MiddlewareObject<
  IAPIGatewayEvent<string | T>,
  any
> => {
  return {
    before: (handler, next) => {
      const body = handler.event.body as string

      if (!body) {
        throw createHttpError(400, 'Body required')
      }

      // should check content type and json

      let parsedBody: T

      try {
        parsedBody = JSON.parse(body) // could transform body as reviver to remove /n etc
      } catch (err) {
        throw createHttpError(400, 'Invalid JSON')
      }

      handler.event.body = parsedBody
      handler.event.rawBody = body

      next()
    },
  }
}

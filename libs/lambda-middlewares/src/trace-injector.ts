/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'

import { IContext } from './interfaces/context.interface'

export interface ITraceInjectorConfig {
  id: string
}

export const traceInjector = (): middy.MiddlewareObject<any, any, IContext> => {
  return {
    before: (handler, next) => {
      const traceId = Math.random().toString(16).slice(2)
      console.log('Starting lambda', { traceId })

      handler.context = {
        ...handler.context,
        traceId,
      }

      next()
    },
  }
}

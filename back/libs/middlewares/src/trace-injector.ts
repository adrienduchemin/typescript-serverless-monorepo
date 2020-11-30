/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'

import { IInjectedContext } from './injected-context'

export interface ITraceInjectorConfig {
  id: string
}

export const traceInjector = (): middy.MiddlewareObject<
  any,
  any,
  IInjectedContext
> => {
  return {
    before: (handler, next) => {
      const traceId = Math.random().toString(16).slice(2)
      console.log('Starting lambda', { traceId })

      const config: ITraceInjectorConfig = {
        id: traceId,
      }

      handler.context.config = {
        ...handler.context.config,
        trace: config,
      }

      next()
    },
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'

import { IContext } from './interfaces/context.interface'

export interface ITraceInjectorConfig {
  traceId: string
}

export const traceInjector = (
  config: ITraceInjectorConfig
): middy.MiddlewareObject<any, any, IContext> => {
  return {
    before: (handler, next) => {
      handler.context.traceId = config.traceId
      next()
    },
  }
}

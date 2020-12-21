/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { EventBridgeClient } from '@mimir/eventbridge'

import { IContext } from './interfaces/context.interface'

export interface IEventBridgeInjectorConfig {
  eventBridgeClient: EventBridgeClient
}

export const eventBridgeInjector = (
  config: IEventBridgeInjectorConfig
): middy.MiddlewareObject<any, any, IContext> => {
  return {
    before: (handler, next) => {
      handler.context.eventBridge = config.eventBridgeClient
      next()
    },
  }
}

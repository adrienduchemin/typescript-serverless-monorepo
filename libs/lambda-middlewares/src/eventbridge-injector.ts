/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { EventBridge } from 'aws-sdk'

import { IContext } from './interfaces/context.interface'

export interface IEventBridgeInjectorConfig {
  client: EventBridge
}

export const EventBridgeInjector = (
  config: IEventBridgeInjectorConfig
): middy.MiddlewareObject<any, any, IContext> => {
  return {
    before: (handler, next) => {
      handler.context = {
        ...handler.context,
        eventbridge: config,
      }
      next()
    },
  }
}

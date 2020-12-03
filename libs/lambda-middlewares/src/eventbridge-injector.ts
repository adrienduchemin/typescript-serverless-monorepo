/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { EventBridge } from 'aws-sdk'

import { IInjectedContext } from './injected-context'

export interface IEventBridgeInjectorConfig {
  client: EventBridge
}

export const EventBridgeInjector = (
  config: IEventBridgeInjectorConfig
): middy.MiddlewareObject<any, any, IInjectedContext> => {
  return {
    before: (handler, next) => {
      handler.context.config = {
        ...handler.context.config,
        eventbridge: config,
      }
      next()
    },
  }
}

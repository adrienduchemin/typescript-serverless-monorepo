/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { EventBridge } from 'aws-sdk'

import { IInjectedContext } from './injected-context'

export interface IEventBridgeInjectorConfig {
  client: EventBridge
}

export type IEventBridgeInjectorOptions = EventBridge.ClientConfiguration

export const EventBridgeInjector = (
  options: IEventBridgeInjectorOptions
): middy.MiddlewareObject<any, any, IInjectedContext> => {
  return {
    before: (handler, next) => {
      const client = new EventBridge({
        apiVersion: 'latest',
        ...options,
      })

      const config: IEventBridgeInjectorConfig = {
        client,
      }

      handler.context.config = {
        ...handler.context.config,
        eventbridge: config,
      }

      next()
    },
  }
}

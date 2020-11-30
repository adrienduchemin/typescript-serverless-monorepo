import middy from '@middy/core'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

import { IContextWithConfig } from './context-with-config.interface'

export const instanceId = (): middy.MiddlewareObject<
  APIGatewayProxyEventV2,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IContextWithConfig
> => {
  return {
    before: (handler, next) => {
      const instanceId = Math.random().toString(16).slice(2)
      handler.context.config = { ...handler.context.config, instanceId }

      console.log('Starting lambda', { instanceId })
      next()
    },
  }
}

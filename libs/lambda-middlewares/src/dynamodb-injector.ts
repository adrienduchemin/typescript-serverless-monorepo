/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { IInjectedContext } from './injected-context'

export interface IDynamoDBInjectorConfig {
  client: DocumentClient
  tableName: string
}

export const dynamoDBInjector = (
  config: IDynamoDBInjectorConfig
): middy.MiddlewareObject<any, any, IInjectedContext> => {
  return {
    before: (handler, next) => {
      handler.context.config = {
        ...handler.context.config,
        dynamodb: config,
      }
      next()
    },
  }
}

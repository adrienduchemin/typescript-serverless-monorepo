/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { DynamoDBClient } from '@mimir/dynamodb'

import { IContext } from './interfaces/context.interface'

export interface IDynamoDBInjectorConfig {
  dynamoDBClient: DynamoDBClient
}

export const dynamoDBInjector = (
  config: IDynamoDBInjectorConfig
): middy.MiddlewareObject<any, any, IContext> => {
  return {
    before: (handler, next) => {
      handler.context.dynamoDB = config.dynamoDBClient
      next()
    },
  }
}

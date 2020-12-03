/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import createHttpError from 'http-errors'

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
      if (!config.tableName) {
        // todo
        // create ConfigError('No DynamoDB table in env')
        throw createHttpError(500)
      }

      handler.context.config = {
        ...handler.context.config,
        dynamodb: config,
      }
      next()
    },
  }
}

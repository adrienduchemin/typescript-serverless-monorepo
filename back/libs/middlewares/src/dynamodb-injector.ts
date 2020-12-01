/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service'

import { IInjectedContext } from './injected-context'

export interface IDynamoDBInjectorConfig {
  client: DocumentClient
  tableName: string
}

export interface IDynamoDBInjectorOptions {
  documentClientOptions?: DocumentClient.DocumentClientOptions &
    ServiceConfigurationOptions &
    DynamoDB.ClientApiVersions
  tableName: string
}

export const dynamoDBInjector = (
  options: IDynamoDBInjectorOptions
): middy.MiddlewareObject<any, any, IInjectedContext> => {
  return {
    before: (handler, next) => {
      const { tableName, documentClientOptions } = options

      const client = new DocumentClient({
        apiVersion: 'latest',
        ...documentClientOptions,
      })

      const config: IDynamoDBInjectorConfig = {
        tableName,
        client,
      }

      handler.context.config = {
        ...handler.context.config,
        dynamodb: config,
      }

      next()
    },
  }
}

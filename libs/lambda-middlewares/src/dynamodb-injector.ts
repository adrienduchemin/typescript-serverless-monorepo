/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { DynamoDBClient } from '@mimir/dynamodb'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
// import createHttpError from 'http-errors'
// import { v4 as uuidv4 } from 'uuid'

import { IContext } from './interfaces/context.interface'

export interface IDynamoDBInjectorConfig {
  client: DocumentClient
  tableName: string
}

export const dynamoDBInjector = (
  dynamodbClient: DynamoDBClient
  // requiredTable?: string[]
): middy.MiddlewareObject<any, any, IContext> => {
  return {
    before: (handler, next) => {
      // requiredTable!.forEach((table) => {
      //   if (!process.env[table]) throw createHttpError(500)
      // })
      // check config default
      // if (!config.tableName) {
      //   // todo
      //   // create ConfigError('No DynamoDB table in env')
      //   throw createHttpError(500)
      // }

      handler.context.dynamodb = dynamodbClient
      next()
    },
  }
}

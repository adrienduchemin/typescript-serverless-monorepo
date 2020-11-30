/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { IInjectedContext } from './injected-context'

export interface IDbInjectorConfig {
  client: DocumentClient
  tableName: string
}

export interface IDbInjectorOptions {
  endpoint?: string
  region: string
  tableName: string
}

export const dbInjector = (
  options: IDbInjectorOptions
): middy.MiddlewareObject<any, any, IInjectedContext> => {
  return {
    before: (handler, next) => {
      const { tableName, region, endpoint } = options

      const client = new DocumentClient({
        apiVersion: 'latest',
        region,
        endpoint,
      })

      const config: IDbInjectorConfig = {
        tableName,
        client,
      }

      handler.context.config = {
        ...handler.context.config,
        db: config,
      }

      next()
    },
  }
}

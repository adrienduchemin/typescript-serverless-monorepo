/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

export interface IBodyValidatorOptions {
  endpoint?: string
  region: string
  tableName: string
}

export const bodyValidator = (): // options: IBodyValidatorOptions
middy.MiddlewareObject<APIGatewayProxyEventV2, any> => {
  return {
    before: (handler, next) => {
      // const { tableName, region, endpoint } = options

      next()
    },
  }
}

import { AWS_DYNAMODB_LOCAL_ENDPOINT, AWS_REGION } from '@constants'
import {
  IDynamoDBInjectorConfig,
  IApiGatewayEventBodyValidatorOptions,
} from '@middlewares'
import { DynamoDB } from 'aws-sdk'

import { DEFAULT_TABLE_NAME } from './constants'
import { bodySchema } from './schema'

export const dynamoDBInjectorConfig: IDynamoDBInjectorConfig = {
  tableName: process.env.TABLE_NAME ?? DEFAULT_TABLE_NAME,
  client: new DynamoDB.DocumentClient({
    apiVersion: 'latest',
    region: process.env.REGION_DB ?? process.env.REGION ?? AWS_REGION,
    endpoint: process.env.AWS_SAM_LOCAL && AWS_DYNAMODB_LOCAL_ENDPOINT,
  }),
}

export const apiGatewayEventBodyValidatorOptions: IApiGatewayEventBodyValidatorOptions = {
  schema: bodySchema,
  validationOptions: { abortEarly: false, allowUnknown: false, convert: false },
}

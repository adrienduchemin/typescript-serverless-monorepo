import {
  IDynamoDBInjectorConfig,
  IApiGatewayEventBodyValidatorOptions,
} from '@mimir/lambda-middlewares'
import { DynamoDB } from 'aws-sdk'

import { DEFAULT_TABLE_NAME } from './constants'
import { bodySchema } from './schema'

export const dynamoDBInjectorConfig: IDynamoDBInjectorConfig = {
  tableName: process.env.TABLE_NAME ?? DEFAULT_TABLE_NAME,
  client: new DynamoDB.DocumentClient({
    apiVersion: 'latest',
    region: process.env.REGION_DB ?? process.env.REGION,
    endpoint: process.env.AWS_SAM_LOCAL,
  }),
}

export const apiGatewayEventBodyValidatorOptions: IApiGatewayEventBodyValidatorOptions = {
  schema: bodySchema,
  validationOptions: { abortEarly: false, allowUnknown: false, convert: false },
}

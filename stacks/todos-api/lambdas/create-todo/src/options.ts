import {
  IDynamoDBInjectorConfig,
  IApiGatewayEventBodyValidatorOptions,
} from '@mimir/lambda-middlewares'
import { DynamoDB } from 'aws-sdk'

import { bodySchema } from './schema'

export const dynamoDBInjectorConfig: IDynamoDBInjectorConfig = {
  tableName: process.env.AWS_DYNAMODB_TABLE_NAME!,
  client: new DynamoDB.DocumentClient({
    apiVersion: 'latest',
    region: process.env.AWS_DYNAMODB_REGION,
    endpoint: process.env.AWS_SAM_LOCAL && 'http://dynamodb:8000',
  }),
}

export const apiGatewayEventBodyValidatorOptions: IApiGatewayEventBodyValidatorOptions = {
  schema: bodySchema,
  validationOptions: { abortEarly: false, allowUnknown: false, convert: false },
}

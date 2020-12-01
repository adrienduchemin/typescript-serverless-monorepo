import { AWS_DYNAMODB_LOCAL_ENDPOINT, AWS_REGION } from '@constants'
import {
  IDynamoDBInjectorOptions,
  IApiGatewayEventBodyValidatorOptions,
} from '@middlewares'

import { DEFAULT_TABLE_NAME } from './constants'
import { bodySchema } from './schema'

export const dynamoDBInjectorOptions: IDynamoDBInjectorOptions = {
  documentClientOptions: {
    region: process.env.REGION_DB ?? process.env.REGION ?? AWS_REGION,
    endpoint: process.env.AWS_SAM_LOCAL && AWS_DYNAMODB_LOCAL_ENDPOINT,
  },
  tableName: process.env.TABLE_NAME ?? DEFAULT_TABLE_NAME,
}

export const apiGatewayEventBodyValidatorOptions: IApiGatewayEventBodyValidatorOptions = {
  schema: bodySchema,
  validationOptions: { abortEarly: false, allowUnknown: false, convert: false },
}

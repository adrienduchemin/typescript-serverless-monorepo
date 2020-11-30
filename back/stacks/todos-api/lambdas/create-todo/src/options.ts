import { AWS_DYNAMODB_LOCAL_ENDPOINT, AWS_REGION } from '@constants'
import { IDynamoDBInjectorOptions } from '@middlewares'

import { DEFAULT_TABLE_NAME } from './constants'

export const dynamoDBInjectorOptions: IDynamoDBInjectorOptions = {
  region: process.env.REGION_DB ?? process.env.REGION ?? AWS_REGION,
  tableName: process.env.TABLE_NAME ?? DEFAULT_TABLE_NAME,
  endpoint: process.env.AWS_SAM_LOCAL && AWS_DYNAMODB_LOCAL_ENDPOINT,
}

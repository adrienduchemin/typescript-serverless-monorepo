import { DynamoDBClient } from '@mimir/dynamodb'
import {
  IDynamoDBInjectorConfig,
  IHttpBodyValidatorConfig,
  ITraceInjectorConfig,
} from '@mimir/lambda-middlewares'

import { bodySchema } from './schema'

export const httpBodyValidatorConfig: IHttpBodyValidatorConfig = {
  schema: bodySchema,
}

export const dynamoDBInjectorConfig: IDynamoDBInjectorConfig = {
  dynamoDBClient: new DynamoDBClient(),
}

export const traceInjectorConfig: ITraceInjectorConfig = {
  traceId: Math.random().toString(16).slice(2),
}

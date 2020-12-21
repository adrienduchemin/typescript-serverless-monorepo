import {
  AWS_DYNAMODB_LOCAL_ENDPOINT,
  AWS_DYNAMODB_REGION,
  AWS_DYNAMODB_API_VERSION,
} from '../constants/dynamodb.constant'

const endpoint =
  process.env.AWS_SAM_LOCAL ??
  (process.env.AWS_DYNAMODB_LOCAL_ENDPOINT || AWS_DYNAMODB_LOCAL_ENDPOINT)

const region = process.env.AWS_DYNAMODB_REGION || AWS_DYNAMODB_REGION

const apiVersion =
  process.env.AWS_DYNAMODB_API_VERSION || AWS_DYNAMODB_API_VERSION

export interface IDynamoDBConfig {
  apiVersion: string
  region: string
  endpoint: string
}

export const dynamoDBConfig: IDynamoDBConfig = {
  apiVersion,
  region,
  endpoint,
}

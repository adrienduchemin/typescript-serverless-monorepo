import { AWS_DYNAMODB_LOCAL_ENDPOINT } from '../constants/dynamodb.constant'
import { IDynamoDBConfig } from '../interfaces/dynamodb-config.interface'

export default {
  apiVersion: 'latest',
  region: process.env.AWS_DYNAMODB_REGION,
  endpoint: process.env.AWS_SAM_LOCAL && AWS_DYNAMODB_LOCAL_ENDPOINT,
} as IDynamoDBConfig

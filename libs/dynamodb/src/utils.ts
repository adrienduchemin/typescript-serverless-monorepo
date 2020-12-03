import { DynamoDBError } from '@mimir/lambda-errors'
import { ClientApiVersions, DocumentClient } from 'aws-sdk/clients/dynamodb'
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service'

import defaultDynamodbOptions from './config/dynamodb.config'

export class DynamoDBClient {
  private readonly dynamodbClient: DocumentClient
  constructor(
    options?: DocumentClient.DocumentClientOptions &
      ServiceConfigurationOptions &
      ClientApiVersions
  ) {
    this.dynamodbClient = new DocumentClient({
      ...defaultDynamodbOptions,
      ...options,
    })
  }

  async put<T>(item: T, tableName: string): Promise<T> {
    const dynamodbItem: DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    }
    try {
      await this.dynamodbClient.put(dynamodbItem).promise()
      return item
    } catch (err) {
      throw new DynamoDBError(err)
    }
  }

  async create<T>(item: T, tableName: string): Promise<T> {
    return this.put(item, tableName)
  }

  async update<T>(item: T, tableName: string): Promise<T> {
    return this.put(item, tableName)
  }
}

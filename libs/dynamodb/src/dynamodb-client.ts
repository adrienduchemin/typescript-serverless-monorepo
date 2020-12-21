import { DynamoDBError } from '@mimir/lambda-errors'
import { ClientApiVersions, DocumentClient } from 'aws-sdk/clients/dynamodb'
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service'

import { dynamoDBConfig } from './config/dynamodb.config'

export class DynamoDBClient {
  private readonly documentClient: DocumentClient

  constructor(
    options?: DocumentClient.DocumentClientOptions &
      ServiceConfigurationOptions &
      ClientApiVersions
  ) {
    this.documentClient = new DocumentClient({
      ...dynamoDBConfig,
      ...options,
    })
  }

  private async put<T>(item: T, tableName: string): Promise<T> {
    const dynamodbItem: DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    }
    try {
      await this.documentClient.put(dynamodbItem).promise()
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

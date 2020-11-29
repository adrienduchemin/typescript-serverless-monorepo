import { config, DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export interface IConfig {
  db: DocumentClient
  tableName: string
}

export const initConfig = (): IConfig => {
  const tableName = process.env.TABLE_NAME || 'todos'

  config.update({
    region: process.env.REGION || 'eu-central-1',
    apiVersion: 'latest',
  })

  let db: DocumentClient
  if (process.env.AWS_SAM_LOCAL) {
    db = new DynamoDB.DocumentClient({
      endpoint: 'http://dynamodb:8000',
    })
  } else {
    db = new DynamoDB.DocumentClient()
  }

  // init some async stuff like parameter stores for example
  // await Promise.all([Promise.resolve({})])

  return {
    db,
    tableName,
  }
}
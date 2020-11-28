import { config, DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export interface IConfig {
  db: DocumentClient
  env: {
    environment: string
    region: string
    tableName: string
  }
}

export const initConfig = (): IConfig => {
  const region = process.env.REGION || 'eu-central-1'
  const environment = process.env.NODE_ENV || 'development'
  const tableName = process.env.TABLE_NAME || 'todos'

  config.update({ region, apiVersion: 'latest' })

  const db = new DynamoDB.DocumentClient({
    endpoint: 'http://dynamodb-local:8000',
  })

  // const db = new DynamoDB.DocumentClient({
  //   endpoint:
  //     environment === 'development' ? 'http://localhost:8000' : undefined,
  // })

  // init some async stuff like parameter stores for example
  // await Promise.all([Promise.resolve({})])

  return {
    db,
    env: {
      region,
      environment,
      tableName,
    },
  }
}

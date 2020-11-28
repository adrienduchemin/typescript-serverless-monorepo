import { DataMapper } from '@aws/dynamodb-data-mapper'
import { config, DynamoDB } from 'aws-sdk'

export interface IConfig {
  mapper: DataMapper
  env: {
    environment: string
    region: string
  }
}

export const initConfig = (): IConfig => {
  const region = process.env.REGION || 'eu-central-1'
  const environment = process.env.NODE_ENV || 'development'

  const tableNamePrefix =
    environment === 'development'
      ? 'dev_'
      : environment === 'staging'
      ? 'staging_'
      : ''

  config.update({ region, apiVersion: 'latest' })

  const mapper = new DataMapper({
    client: new DynamoDB(),
    tableNamePrefix, // optionally, you can provide a table prefix to keep your dev and prod tables separate
  })

  // init some async stuff like parameter stores for example
  // await Promise.all([Promise.resolve({})])

  return {
    mapper,
    env: {
      region,
      environment,
    },
  }
}

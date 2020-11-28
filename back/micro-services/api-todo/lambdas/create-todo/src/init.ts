import { DataMapper } from '@aws/dynamodb-data-mapper'
import { config, DynamoDB } from 'aws-sdk'

export interface IConfig {
  mapper: DataMapper
}

export const initConfig = (): IConfig => {
  const region = process.env.REGION || 'eu-central-1'
  const environment = process.env.NODE_ENV

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

  // maybe verify that table exist otherwise do (don't know if cdk does init the schema)
  // await mapper.createTable(Todo, {
  //   readCapacityUnits: 5,
  //   writeCapacityUnits: 5,
  //   indexOptions: {
  //     myIndexOnName: {
  //       type: 'local', // local or global ?
  //       projection: ['name'], // or NAME or ?
  //     },
  //   },
  // })

  // init some async stuff like parameter stores for example
  // await Promise.all([Promise.resolve({})])

  return { mapper }
}

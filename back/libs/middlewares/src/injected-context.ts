import { Context } from 'aws-lambda'

import { IDynamoDBInjectorConfig } from './dynamodb-injector'
import { ITraceInjectorConfig } from './trace-injector'

export interface IInjectedContext extends Context {
  config?: IInjectorConfig
}

export interface IInjectorConfig {
  db?: IDynamoDBInjectorConfig
  trace?: ITraceInjectorConfig
}

import { Context } from 'aws-lambda'

import { IDynamoDBInjectorConfig } from './dynamodb-injector'
import { IEventBridgeInjectorConfig } from './eventbridge-injector'
import { ITraceInjectorConfig } from './trace-injector'

export interface IInjectedContext extends Context {
  config?: IInjectorConfig
}

export interface IInjectorConfig {
  dynamodb?: IDynamoDBInjectorConfig
  trace?: ITraceInjectorConfig
  eventbridge?: IEventBridgeInjectorConfig
}

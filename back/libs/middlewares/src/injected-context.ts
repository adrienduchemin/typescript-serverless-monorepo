import { Context } from 'aws-lambda'

import { IDbInjectorConfig } from './db-injector'
import { ITraceInjectorConfig } from './trace-injector'

export interface IInjectedContext extends Context {
  config?: IInjectorConfig
}

export interface IInjectorConfig {
  db?: IDbInjectorConfig
  trace?: ITraceInjectorConfig
}

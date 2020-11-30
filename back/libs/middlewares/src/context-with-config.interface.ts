import { Context } from 'aws-lambda'

export interface IContextWithConfig extends Context {
  config?: {
    instanceId?: string
  }
}

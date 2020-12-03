import { IEventBridgeInjectorConfig } from '@mimir/lambda-middlewares'
import { EventBridge } from 'aws-sdk'

export const eventBridgeInjectorConfig: IEventBridgeInjectorConfig = {
  client: new EventBridge({
    apiVersion: 'latest',
    region: process.env.REGION,
  }),
}

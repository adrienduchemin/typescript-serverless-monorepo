import { AWS_REGION } from '@constants'
import { IEventBridgeInjectorConfig } from '@middlewares'
import { EventBridge } from 'aws-sdk'

export const eventBridgeInjectorConfig: IEventBridgeInjectorConfig = {
  client: new EventBridge({
    apiVersion: 'latest',
    region: process.env.REGION ?? AWS_REGION,
  }),
}

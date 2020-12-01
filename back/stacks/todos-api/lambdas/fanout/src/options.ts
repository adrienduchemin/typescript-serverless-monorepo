import { AWS_REGION } from '@constants'
import { IEventBridgeInjectorOptions } from '@middlewares'

export const eventBridgeInjectorOptions: IEventBridgeInjectorOptions = {
  region: process.env.REGION ?? AWS_REGION,
}

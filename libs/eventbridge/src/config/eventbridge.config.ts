import {
  AWS_EVENTBRIDGE_REGION,
  AWS_EVENTBRIDGE_API_VERSION,
} from '../constants/eventbridge.constant'

const region = process.env.AWS_EVENTBRIDGE_REGION || AWS_EVENTBRIDGE_REGION

const apiVersion =
  process.env.AWS_EVENTBRIDGE_API_VERSION || AWS_EVENTBRIDGE_API_VERSION

interface IEventBridgeConfig {
  apiVersion: string
  region: string
}

export const eventBridgeConfig: IEventBridgeConfig = {
  apiVersion,
  region,
}

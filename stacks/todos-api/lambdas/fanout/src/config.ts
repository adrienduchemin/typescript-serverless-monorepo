import { EventBridgeClient } from '@mimir/eventbridge'
import {
  ITraceInjectorConfig,
  IEventBridgeInjectorConfig,
} from '@mimir/lambda-middlewares'

export const eventBridgeInjectorConfig: IEventBridgeInjectorConfig = {
  eventBridgeClient: new EventBridgeClient(),
}

export const traceInjectorConfig: ITraceInjectorConfig = {
  traceId: Math.random().toString(16).slice(2),
}

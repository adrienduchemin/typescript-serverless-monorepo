import { EventBridgeError } from '@mimir/lambda-errors'
import { EventBridge } from 'aws-sdk'
import {
  ClientConfiguration,
  PutEventsRequest,
} from 'aws-sdk/clients/eventbridge'

import { eventBridgeConfig } from './config/eventbridge.config'

export interface IEventBridgeEntry<T> {
  eventName: 'INSERT' | 'MODIFY' | 'REMOVE' | undefined
  newObject: T | undefined
  oldObject: T | undefined
}

export class EventBridgeClient {
  private readonly eventbridge: EventBridge

  constructor(options?: ClientConfiguration) {
    this.eventbridge = new EventBridge({
      ...eventBridgeConfig,
      ...options,
    })
  }

  async put<T>(
    entries: IEventBridgeEntry<T>[],
    source: string,
    eventBusName: string
  ): Promise<void> {
    const params: PutEventsRequest = {
      Entries: entries.map((entry) => {
        const { eventName, newObject, oldObject } = entry
        return {
          Source: source,
          EventBusName: eventBusName,
          DetailType: eventName,
          Detail: JSON.stringify({ newObject, oldObject }),
        }
      }),
    }

    try {
      await this.eventbridge.putEvents(params).promise()
    } catch (err) {
      throw new EventBridgeError(err)
    }
  }
}

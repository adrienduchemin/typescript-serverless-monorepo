import { DynamoDBStreamEvent } from 'aws-lambda'
import {
  PutEventsRequest,
  PutEventsRequestEntryList,
} from 'aws-sdk/clients/cloudwatchevents'

import { IConfig } from './init'

interface EventBridgeEntry {
  eventType: string
  todo: unknown
}

export const handle = async (
  event: DynamoDBStreamEvent,
  { eventbridge }: IConfig
): Promise<void> => {
  const entries: EventBridgeEntry[] = []

  event.Records.forEach((record) => {
    const { dynamodb, eventName } = record
    if (!dynamodb) {
      return
    }

    // TODO : USE AWS.DynamoDB.Converter : https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/Converter.html

    eventName === 'INSERT'
    const { NewImage } = dynamodb
    // const todoId = Keys!.todoId.S!

    if (eventName === 'MODIFY') {
      // update
      // OldImage
    } else if (eventName === 'INSERT') {
      // create
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const todo: any = {}
      for (const [key, value] of Object.entries(NewImage!)) {
        // should check each S, N , ...
        todo[key] = value.S
      }
      entries.push({ eventType: 'create', todo })
    } else {
      // delete
    }
  })

  const Entries: PutEventsRequestEntryList = []

  entries.forEach((entry) => {
    Entries.push({
      Source: 'todos-api',
      EventBusName: 'todos',
      DetailType: entry.eventType,
      Detail: JSON.stringify(entry.todo),
    })
  })

  const params: PutEventsRequest = {
    Entries,
  }

  try {
    const result = await eventbridge.putEvents(params).promise()
    console.log(result)
  } catch (err) {
    // throw a better error with tracer : err
    throw new Error('Event bridge error')
  }
}

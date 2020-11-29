import { ITodo } from '@shared-types'
import { DynamoDBStreamEvent } from 'aws-lambda'
import { PutEventsRequest } from 'aws-sdk/clients/cloudwatchevents'
import { Converter } from 'aws-sdk/clients/dynamodb'

import { IConfig } from './init'

export const handle = async (
  event: DynamoDBStreamEvent,
  { eventbridge }: IConfig
): Promise<void> => {
  // maybe should for of with async and send them one by one to eventbridge
  // so each error can be sent individually instead of replay everything everytime
  const entries = event.Records.map((record) => {
    const { dynamodb, eventName } = record
    const { NewImage, OldImage } = dynamodb!

    let newObject: ITodo | undefined, oldObject: ITodo | undefined

    switch (eventName) {
      case 'INSERT':
        newObject = Converter.unmarshall(NewImage!) as ITodo
        break
      case 'MODIFY':
        newObject = Converter.unmarshall(NewImage!) as ITodo
        oldObject = Converter.unmarshall(OldImage!) as ITodo
        break
      case 'REMOVE':
        oldObject = Converter.unmarshall(OldImage!) as ITodo
        break
    }

    return {
      eventName,
      newObject,
      oldObject,
    }
  })

  const params: PutEventsRequest = {
    Entries: entries.map((entry) => {
      const { eventName, newObject, oldObject } = entry
      return {
        Source: 'todos-api',
        EventBusName: 'todo',
        DetailType: eventName,
        Detail: JSON.stringify({ newObject, oldObject }),
      }
    }),
  }

  try {
    await eventbridge.putEvents(params).promise()
  } catch (err) {
    // throw a better error with tracer : err
    // do something with them
    throw new Error('Event bridge error')
  }
}

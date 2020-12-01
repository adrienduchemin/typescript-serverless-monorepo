import { IInjectorConfig } from '@middlewares'
import { ITodo } from '@types'
import { DynamoDBStreamEvent } from 'aws-lambda'
import { AWSError } from 'aws-sdk'
import { PutEventsRequest } from 'aws-sdk/clients/cloudwatchevents'
import { Converter } from 'aws-sdk/clients/dynamodb'
import createHttpError from 'http-errors'

export const handle = async (
  event: DynamoDBStreamEvent,
  config: IInjectorConfig
): Promise<void> => {
  const { client } = config.eventbridge!

  // should be moved to parser
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

  // should be moved to a lib
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

  // should be moved to a lib
  try {
    await client.putEvents(params).promise()
  } catch (err) {
    const { message, code, statusCode } = err as AWSError
    const errorMessage = 'EventBridge error'
    console.error(errorMessage, { code, message, statusCode })
    throw createHttpError(500, errorMessage)
  }
}

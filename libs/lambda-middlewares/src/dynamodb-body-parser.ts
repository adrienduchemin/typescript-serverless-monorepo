/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import { Converter } from 'aws-sdk/clients/dynamodb'

import { IDynamoDBEvent } from './interfaces'

export const dynamoDBBodyParser = <T>(): middy.MiddlewareObject<
  IDynamoDBEvent<T>,
  any
> => {
  return {
    before: (handler, next) => {
      handler.event.body = handler.event.Records.map((record) => {
        const { dynamodb, eventName } = record
        const { NewImage, OldImage } = dynamodb!

        let newObject: T | undefined, oldObject: T | undefined

        switch (eventName) {
          case 'INSERT':
            newObject = Converter.unmarshall(NewImage!) as T
            break
          case 'MODIFY':
            newObject = Converter.unmarshall(NewImage!) as T
            oldObject = Converter.unmarshall(OldImage!) as T
            break
          case 'REMOVE':
            oldObject = Converter.unmarshall(OldImage!) as T
            break
        }

        return {
          eventName,
          newObject,
          oldObject,
        }
      })
      next()
    },
  }
}

import { ICreateTodoDto, ITodo } from '@types'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { v4 as uuidv4 } from 'uuid'

import { IConfig } from './init'

export interface IAPIGatewayErrorPayload extends IHttpErrorDetails {
  statusCode: number
  message: string
}

export interface IHttpErrorDetails {
  error?: string
  validationErrors?: string[]
  trace?: unknown
}

export class HttpError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly details?: IHttpErrorDetails
  ) {
    super(message)
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

export class HttpBadRequestError extends HttpError {
  constructor(details?: IHttpErrorDetails) {
    super('BAD_REQUEST', 400, details)
    Object.setPrototypeOf(this, HttpBadRequestError.prototype)
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(details?: IHttpErrorDetails) {
    super('INTERNAL_SERVER_ERROR', 500, details)
    Object.setPrototypeOf(this, HttpInternalServerError.prototype)
  }
}

export const handle = async (
  event: APIGatewayProxyEventV2,
  { db, tableName }: IConfig
): Promise<ITodo> => {
  if (!event.body) {
    throw new HttpBadRequestError({ error: 'A body required' })
  }

  const createTodoDto = JSON.parse(event.body) as ICreateTodoDto

  if (!createTodoDto.name) {
    throw new HttpBadRequestError({ validationErrors: ['name required'] })
  }

  const params = {
    TableName: tableName,
    Item: {
      todoId: uuidv4(),
      ...createTodoDto,
    },
  }

  try {
    const todoCreated = await db.put(params).promise()
    return todoCreated.Attributes as ITodo
  } catch (err) {
    throw new HttpInternalServerError({ error: 'DynamoDB error', trace: err })
  }
}

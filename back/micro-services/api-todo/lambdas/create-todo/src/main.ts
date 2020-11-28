import { ICreateTodoDto, ITodo } from '@shared-types'
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
  }
}

export class HttpBadRequestError extends HttpError {
  constructor(details?: IHttpErrorDetails) {
    super('BAD_REQUEST', 400, details)
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(details?: IHttpErrorDetails) {
    super('INTERNAL_SERVER_ERROR', 500, details)
  }
}

export const handle = async (
  event: APIGatewayProxyEventV2,
  { db, env: { tableName } }: IConfig
): Promise<ITodo> => {
  if (!event.body) {
    throw new HttpBadRequestError({ error: 'Body required' })
  }

  const createTodoDto = JSON.parse(event.body) as ICreateTodoDto

  // validation example
  if (!createTodoDto.name) {
    throw new HttpBadRequestError({ validationErrors: ['Name required'] })
  }

  const params = {
    TableName: tableName,
    Item: {
      id: uuidv4(),
      ...createTodoDto,
    },
  }

  try {
    const todoCreated = await db.put(params).promise()
    return todoCreated.Attributes as ITodo
  } catch (err) {
    // should check the type of DynamoDb error and put error : err.message and trace : err.trace ?
    throw new HttpInternalServerError({ error: 'DynamoDB error', trace: err })
  }
}

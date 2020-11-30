import { IInjectorConfig } from '@middlewares'
import { ICreateTodoDto, ITodo } from '@types'
import { AWSError } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

export interface IAPIGatewayErrorPayload extends IHttpErrorDetails {
  statusCode: number
  message: string
}

export interface IHttpErrorDetails {
  error?: string
  validationErrors?: string[]
  trace?: unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
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
  createTodoDto: ICreateTodoDto,
  config: IInjectorConfig
): Promise<ITodo> => {
  if (!createTodoDto.name) {
    throw new HttpBadRequestError({ validationErrors: ['name required'] })
  }

  const { tableName, client } = config.db!

  const todo: ITodo = {
    todoId: uuidv4(),
    ...createTodoDto,
  }

  const input: DocumentClient.PutItemInput = {
    TableName: tableName,
    Item: todo,
  }

  try {
    // can't work with creation as no attributes are returned
    // const { Attributes }: DocumentClient.PutItemOutput = await client
    //   .put(input)
    //   .promise()
    // return Attributes! as ITodo
    await client.put(input).promise()
    return todo
  } catch (err) {
    const { message, code, statusCode } = err as AWSError
    throw new HttpInternalServerError({ code, message, statusCode })
  }
}

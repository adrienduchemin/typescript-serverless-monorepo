import { IInjectorConfig } from '@middlewares'
import { ICreateTodoDto, ITodo } from '@types'
import { AWSError } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import createError from 'http-errors'
import { v4 as uuidv4 } from 'uuid'

export const handle = async (
  createTodoDto: ICreateTodoDto,
  config: IInjectorConfig
): Promise<ITodo> => {
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
    const errorMessage = 'DynamoDB error'
    console.error(errorMessage, { code, message, statusCode })
    throw createError(500, errorMessage)
  }
}

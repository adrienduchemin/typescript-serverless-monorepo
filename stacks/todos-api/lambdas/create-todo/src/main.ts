import { IInjectorConfig } from '@middlewares'
import { ICreateTodo, ITodo } from '@types'
import { AWSError } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import createHttpError from 'http-errors'
import { v4 as uuidv4 } from 'uuid'

export const handle = async (
  createTodoDto: ICreateTodo,
  config: IInjectorConfig
): Promise<ITodo> => {
  const { tableName, client } = config.dynamodb!

  const todo: ITodo = {
    todoId: uuidv4(),
    ...createTodoDto,
  }

  // should be moved to a lib
  const input: DocumentClient.PutItemInput = {
    TableName: tableName,
    Item: todo,
  }

  try {
    // should be moved to a lib
    // can't work with creation as no attributes are returned
    // const { Attributes }: DocumentClient.PutItemOutput = await client
    //   .put(input)
    //   .promise()
    // return Attributes! as ITodo
    await client.put(input).promise()
    return todo
  } catch (err) {
    const { message, code, statusCode } = err as AWSError
    throw createHttpError(500, 'DynamoDB error', {
      expose: true,
      messageAws: message,
      codeAws: code,
      statusCodeAws: statusCode,
    })
  }
}

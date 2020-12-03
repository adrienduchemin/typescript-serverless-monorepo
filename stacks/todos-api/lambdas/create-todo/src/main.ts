import { DynamoDBError } from '@mimir/lambda-errors'
import { IInjectorConfig } from '@mimir/lambda-middlewares'
import { ICreateTodo, ITodo } from '@mimir/models'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

export const handle = async (
  createTodoDto: ICreateTodo,
  config: IInjectorConfig
): Promise<ITodo> => {
  const { tableName, client } = config.dynamodb!

  const todo: ITodo = {
    todoIdd: uuidv4(),
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
    throw new DynamoDBError(err)
  }
}

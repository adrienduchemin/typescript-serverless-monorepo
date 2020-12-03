import { DynamoDBError } from '@mimir/lambda-errors'
import { IContext } from '@mimir/lambda-middlewares'
import { ICreateTodo, ITodo } from '@mimir/models'
import { v4 as uuidv4 } from 'uuid'

export const handle = async (
  createTodoDto: ICreateTodo,
  { dynamodb }: IContext
): Promise<ITodo> => {
  const todo: ITodo = {
    todoId: uuidv4(),
    ...createTodoDto,
  }

  // Use Case Multiple TABLE_NAME ?
  // If multiple, multiple lambda ?
  // If 2 DYNAMO TABLE
  // Utils that look up in all process.env.TABLE_NAME*
  // getEnvC('') ??
  // Validator That checks that all tables are process.env?

  console.log(dynamodb)
  try {
    return await dynamodb!.put<ITodo>(
      todo,
      process.env.AWS_DYNAMODB_TABLE_NAME as string
    )
  } catch (err) {
    throw new DynamoDBError(err)
  }
}

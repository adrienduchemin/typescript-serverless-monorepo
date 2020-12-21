import { IContext } from '@mimir/lambda-middlewares'
import { ICreateTodo, ITodo } from '@mimir/models'
import { v4 as uuidv4 } from 'uuid'

export const handle = async (
  createTodoDto: ICreateTodo,
  { dynamoDB }: IContext
): Promise<ITodo> => {
  const todo: ITodo = {
    todoId: uuidv4(),
    ...createTodoDto,
  }

  return await dynamoDB!.create<ITodo>(
    todo,
    process.env.AWS_DYNAMODB_TABLE_NAME as string
  )
}

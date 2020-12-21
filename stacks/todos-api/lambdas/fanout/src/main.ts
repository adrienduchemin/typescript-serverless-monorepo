import { IEventBridgeEntry } from '@mimir/eventbridge'
import { IContext } from '@mimir/lambda-middlewares'
import { ITodo } from '@mimir/models'

export const handle = async (
  todos: IEventBridgeEntry<ITodo>[],
  { eventBridge }: IContext
): Promise<void> => {
  await eventBridge!.put(todos, 'todos-api', 'todo')
}

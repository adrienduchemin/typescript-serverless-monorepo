import middy from '@middy/core'
import {
  dynamoDBInjector,
  IContext,
  IAPIGatewayEvent,
  traceInjector,
  httpErrorHandler,
  httpBodyJsonParser,
  httpBodyValidator,
  httpResponseHandler,
} from '@mimir/lambda-middlewares'
import { ICreateTodo, ITodo } from '@mimir/models'

import {
  dynamoDBInjectorConfig,
  httpBodyValidatorConfig,
  traceInjectorConfig,
} from './config'
import { handle } from './main'

const createTodo = async (
  event: IAPIGatewayEvent<ICreateTodo>,
  context: IContext
): Promise<ITodo> => {
  console.log('Handling lambda', { event, context })
  return handle(event.body, context)
}

export const handler = middy(createTodo)
  .use(httpBodyJsonParser<ICreateTodo>())
  .use(httpBodyValidator(httpBodyValidatorConfig)) // use better than joi
  .use(traceInjector(traceInjectorConfig))
  .use(dynamoDBInjector(dynamoDBInjectorConfig))
  .use(httpErrorHandler())
  .use(httpResponseHandler()) // should type this with ITodo

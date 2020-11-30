import {
  apiGatewayEventBodyParser,
  apiGatewayEventBodyValidator,
  dynamoDBInjector,
  IInjectedContext,
  IAPIGatewayParsedEvent,
  traceInjector,
  apiGatewayErrorHandler,
} from '@middlewares'
import middy from '@middy/core'
import { ICreateTodoDto, ITodo } from '@types'
import { APIGatewayProxyResultV2 } from 'aws-lambda'

import { handle } from './main'
import {
  apiGatewayEventBodyValidatorOptions,
  dynamoDBInjectorOptions,
} from './options'

const createTodo = async (
  event: IAPIGatewayParsedEvent<ICreateTodoDto>,
  context: IInjectedContext
): Promise<APIGatewayProxyResultV2<ITodo>> => {
  console.log('Handling lambda', { event, context })
  return handle(event.body, context.config!)
}

export const handler = middy(createTodo)
  .use(apiGatewayErrorHandler()) // so it's the last to execute error
  .use(apiGatewayEventBodyParser())
  .use(apiGatewayEventBodyValidator(apiGatewayEventBodyValidatorOptions))
  .use(traceInjector())
  .use(dynamoDBInjector(dynamoDBInjectorOptions))

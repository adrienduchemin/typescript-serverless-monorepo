import middy from '@middy/core'
import {
  apiGatewayEventBodyParser,
  apiGatewayEventBodyValidator,
  dynamoDBInjector,
  IInjectedContext,
  IAPIGatewayParsedEvent,
  traceInjector,
  httpErrorHandler,
} from '@mimir/lambda-middlewares'
import { ICreateTodo, ITodo } from '@mimir/models'
import { APIGatewayProxyResultV2 } from 'aws-lambda'

import { handle } from './main'
import {
  apiGatewayEventBodyValidatorOptions,
  dynamoDBInjectorConfig,
} from './options'

const createTodo = async (
  event: IAPIGatewayParsedEvent<ICreateTodo>,
  context: IInjectedContext
): Promise<APIGatewayProxyResultV2<ITodo>> => {
  console.log('Handling lambda', { event, context })
  return handle(event.body, context.config!)
}

export const handler = middy(createTodo)
  .use(httpErrorHandler()) // so it's the last to execute error
  .use(apiGatewayEventBodyParser())
  .use(apiGatewayEventBodyValidator(apiGatewayEventBodyValidatorOptions))
  .use(traceInjector())
  .use(dynamoDBInjector(dynamoDBInjectorConfig))

import middy from '@middy/core'
import { DynamoDBClient } from '@mimir/dynamodb'
import {
  apiGatewayEventBodyParser,
  apiGatewayEventBodyValidator,
  dynamoDBInjector,
  IContext,
  IAPIGatewayParsedEvent,
  traceInjector,
  httpErrorHandler,
} from '@mimir/lambda-middlewares'
import { ICreateTodo, ITodo } from '@mimir/models'
import { APIGatewayProxyResultV2 } from 'aws-lambda'

import { handle } from './main'
import { apiGatewayEventBodyValidatorOptions } from './options'

const dynamoDBClient = new DynamoDBClient()

const createTodo = async (
  event: IAPIGatewayParsedEvent<ICreateTodo>,
  context: IContext
): Promise<APIGatewayProxyResultV2<ITodo>> => {
  console.log('Handling lambda', { event, context })
  return handle(event.body, context)
}

export const handler = middy(createTodo)
  .use(httpErrorHandler())
  .use(apiGatewayEventBodyParser())
  .use(apiGatewayEventBodyValidator(apiGatewayEventBodyValidatorOptions))
  .use(traceInjector())
  .use(dynamoDBInjector(dynamoDBClient))

import { APIGatewayProxyEventV2 } from 'aws-lambda'

export interface IAPIGatewayEvent<T>
  extends Omit<APIGatewayProxyEventV2, 'body'> {
  body: T
  rawBody?: string
}

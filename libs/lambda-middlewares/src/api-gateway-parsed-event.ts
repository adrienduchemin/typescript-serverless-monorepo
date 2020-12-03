import { APIGatewayProxyEventV2 } from 'aws-lambda'

export interface IAPIGatewayParsedEvent<T>
  extends Omit<APIGatewayProxyEventV2, 'body'> {
  body: T
  rawBody: string
}

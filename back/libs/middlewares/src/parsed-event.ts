import { APIGatewayProxyEventV2 } from 'aws-lambda'

export interface IParsedEvent<T> extends Omit<APIGatewayProxyEventV2, 'body'> {
  body: T
  rawBody: string
}

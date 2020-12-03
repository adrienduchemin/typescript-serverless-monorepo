import { IApiGatewayEventBodyValidatorOptions } from '@mimir/lambda-middlewares'

import { bodySchema } from './schema'

export const apiGatewayEventBodyValidatorOptions: IApiGatewayEventBodyValidatorOptions = {
  schema: bodySchema,
}

import { ObjectSchema, ValidationOptions } from 'joi'

export interface IApiGatewayEventBodyValidatorOptions {
  validationOptions?: ValidationOptions
  schema: ObjectSchema
}

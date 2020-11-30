/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import createError from 'http-errors'
import Joi, { ValidationError } from 'joi'

import { IAPIGatewayParsedEvent } from './api-gateway-parsed-event'

export interface IApiGatewayEventBodyValidatorOptions {
  validationOptions?: Joi.ValidationOptions
  schema: Joi.ObjectSchema
}

export const apiGatewayEventBodyValidator = (
  options: IApiGatewayEventBodyValidatorOptions
): middy.MiddlewareObject<IAPIGatewayParsedEvent<any>, any> => {
  return {
    before: async (handler) => {
      try {
        await options.schema.validateAsync(
          handler.event.body,
          options.validationOptions
        )
      } catch (err) {
        const { details } = err as ValidationError
        throw createError(422, 'Validation error', { errors: details })
      }
    },
  }
}

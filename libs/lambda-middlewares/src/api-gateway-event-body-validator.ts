/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import createHttpError from 'http-errors'
import { ValidationError } from 'joi'

import defaultValidationOptions from './config/joi.config'
import { IAPIGatewayParsedEvent } from './interfaces/api-gateway-parsed-event.interface'
import { IApiGatewayEventBodyValidatorOptions } from './interfaces/api-gateway-validator-options.interface'

export const apiGatewayEventBodyValidator = (
  options: IApiGatewayEventBodyValidatorOptions
): middy.MiddlewareObject<IAPIGatewayParsedEvent<any>, any> => {
  return {
    before: async (handler) => {
      try {
        await options.schema.validateAsync(handler.event.body, {
          ...defaultValidationOptions,
          ...options.validationOptions,
        })
      } catch (err) {
        const { details } = err as ValidationError
        throw createHttpError(422, 'Validation error', { errors: details })
      }
    },
  }
}

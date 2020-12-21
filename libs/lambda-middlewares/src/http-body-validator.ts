/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import createHttpError from 'http-errors'
import { ObjectSchema, ValidationError, ValidationOptions } from 'joi'

import { joiConfig } from './config/joi.config'
import { IAPIGatewayEvent } from './interfaces/api-gateway-event.interface'

export interface IHttpBodyValidatorConfig {
  schema: ObjectSchema
  validationOptions?: ValidationOptions
}

export const httpBodyValidator = (
  config: IHttpBodyValidatorConfig
): middy.MiddlewareObject<IAPIGatewayEvent<any>, any> => {
  return {
    before: async (handler) => {
      const { schema, validationOptions } = config
      try {
        await schema.validateAsync(handler.event.body, {
          ...joiConfig,
          ...validationOptions,
        })
      } catch (err) {
        const { details } = err as ValidationError
        throw createHttpError(422, 'Validation error', { errors: details })
      }
    },
  }
}

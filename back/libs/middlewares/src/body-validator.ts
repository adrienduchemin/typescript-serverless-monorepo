// /* eslint-disable @typescript-eslint/no-explicit-any */
// import middy from '@middy/core'
// import { APIGatewayProxyEventV2 } from 'aws-lambda'
// import createError from 'http-errors'
// import Joi from 'joi'

// export interface IBodyValidatorOptions {
//   endpoint?: string
//   region: string
//   tableName: string
// }

// export const bodyValidator = (
//   options: IBodyValidatorOptions
// ): middy.MiddlewareObject<APIGatewayProxyEventV2, any> => {
//   return {
//     before: (handler, next) => {
//       const res = Joi.validate(handler.event, buildSchema(schema), {
//         allowUnknown: true,
//         stripUnknown: true,
//       })
//       if (res.error) {
//         throw createError(422, res.error.message)
//       }
//       next()
//     },
//   }
// }

// import middy from '@middy/core'
// import { APIGatewayProxyEventV2 } from 'aws-lambda'

// import { IInjectedContext } from './context-with-config.interface'

// export interface IGeneratetraceIdOptions {
//   traceIdDefault: string | undefined
// }

// export interface IGeneratetraceIdConfig {
//   traceId: string
// }

// export const generatetraceId = (
//   options?: IGeneratetraceIdOptions
// ): middy.MiddlewareObject<
//   APIGatewayProxyEventV2,
//   never,
//   IInjectedContext
// > => {
//   return {
//     before: (handler, next) => {
//       if (!options) {
//         const traceId = Math.random().toString(16).slice(2)
//         console.log('Starting lambda', { traceId })
//         handler.context.config.traceId = traceId
//       }
//       next()
//     },
//   }
// }

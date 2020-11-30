// import middy from '@middy/core'
// import { APIGatewayProxyEventV2 } from 'aws-lambda'

// import { IContextWithConfig } from './context-with-config.interface'

// export interface IGenerateInstanceIdOptions {
//   instanceIdDefault: string | undefined
// }

// export interface IGenerateInstanceIdConfig {
//   instanceId: string
// }

// export const generateInstanceId = (
//   options?: IGenerateInstanceIdOptions
// ): middy.MiddlewareObject<
//   APIGatewayProxyEventV2,
//   never,
//   IContextWithConfig
// > => {
//   return {
//     before: (handler, next) => {
//       if (!options) {
//         const instanceId = Math.random().toString(16).slice(2)
//         console.log('Starting lambda', { instanceId })
//         handler.context.config.instanceId = instanceId
//       }
//       next()
//     },
//   }
// }

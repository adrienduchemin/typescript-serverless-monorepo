import { generateInstanceId } from '@lambda-utils'
import { ICreateTodo } from '@shared-types'
import { APIGatewayProxyEvent, Context, Handler } from 'aws-lambda'

import { handle } from './main'

// import { init } from './init'

// let initiated = false
const instanceId: string = generateInstanceId()
console.log('Starting lambda', { instanceId })

// (async () => {
//   console.log('Initing lambda', { instanceId })
//   await init()
// })()

// init dynamo etc

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  console.log('Handling lambda', { event, context, instanceId })
  // if (!initiated) {
  //   await init()
  //   initiated = true
  // }
  if (event.body === null) {
    return 'why no body :('
  }
  const body = JSON.parse(event.body) as ICreateTodo
  return handle(body)
}

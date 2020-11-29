import { generateInstanceId } from '@lambda-utils'
import { DynamoDBStreamHandler } from 'aws-lambda'

import { initConfig } from './init'
import { handle } from './main'

const instanceId = generateInstanceId()
const config = initConfig()

export const handler: DynamoDBStreamHandler = async (event, context) => {
  console.log('Handling lambda', { event, context, instanceId })
  try {
    await handle(event, config)
  } catch (err) {
    console.error(err)
  }
}

import { config, EventBridge } from 'aws-sdk'

export interface IConfig {
  eventbridge: EventBridge
}

export const initConfig = (): IConfig => {
  config.update({
    region: process.env.REGION || 'eu-central-1',
    apiVersion: 'latest',
  })

  const eventbridge = new EventBridge()

  return {
    eventbridge,
  }
}

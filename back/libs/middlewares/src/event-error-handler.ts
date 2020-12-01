/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'

export const eventErrorHandler = (): middy.MiddlewareObject<any, void> => {
  return {
    onError: (handler) => {
      const { error } = handler
      console.error(error)
      throw error
    },
  }
}

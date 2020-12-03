import Joi from 'joi'

export const bodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
})

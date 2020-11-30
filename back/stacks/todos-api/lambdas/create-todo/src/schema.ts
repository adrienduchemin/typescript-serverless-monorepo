import Joi from 'joi'

export const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
})

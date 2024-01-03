import * as Joi from 'joi';

export function validateObject(schema: Joi.ObjectSchema, data: unknown) {
  const {error}: Joi.ValidationResult = schema.validate(data, {
    abortEarly: true,
    allowUnknown: true,
  });

  if (error) {
    throw error;
  }
}

import * as Joi from 'joi';

export function validateObject(schema: Joi.Schema, data: unknown) {
  const {error, value}: Joi.ValidationResult = schema.validate(data, {
    abortEarly: true,
    allowUnknown: true,
  });

  if (error) {
    throw error;
  }
  return value
}

import * as Joi from 'joi';

export function validateObject(schema: Joi.Schema, data: unknown) {
  const {error, value}: Joi.ValidationResult = schema.validate(data, {
    abortEarly: true,
    allowUnknown: true,
    errors: {escapeHtml: true},
  });

  return {value, error};
}

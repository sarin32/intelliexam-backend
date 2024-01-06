import * as Joi from 'joi';

export function validateObject(schema: Joi.Schema, data: unknown) {
  const {error, value}: Joi.ValidationResult = schema.validate(data, {
    abortEarly: true,
    allowUnknown: true,
    errors: {escapeHtml: true},
  });

  return {value, error};
}

export function stringSchema({
  min,
  max,
  required = true,
  trim = true,
}: {
  min?: number;
  max?: number;
  required?: boolean;
  trim?: boolean;
}) {
  let schema = Joi.string().trim(trim);
  if (min) schema = schema.min(min);
  if (max) schema = schema.max(max);
  if (required) schema = schema.required();
  return schema;
}

export function emailSchema() {
  return Joi.string().trim().email().required();
}

export function objectSchema<TSchema>({
  object,
  required = true,
}: {
  object: Joi.PartialSchemaMap<TSchema>;
  required?: boolean;
}) {
  let schema = Joi.object(object);
  if (required) schema = schema.required();
  return schema;
}

import type { JsonSchema } from '@jsonforms/core';

type Field = {
  scope: string;
};

/**
 * Adds `minLength: 1` to required string properties that lack an explicit `minLength`.
 * JSON Schema `required` only means "must be present" — an empty string `""` is valid.
 * This bridges the gap so required string fields reject empty values during validation.
 * Recurses into nested object properties.
 */
export const enforceRequiredStringMinLength = (
  schema: JsonSchema,
): JsonSchema => {
  if (!schema?.properties) return schema;

  const required: string[] = (schema as any).required ?? [];
  const patchedProperties = { ...schema.properties };
  let changed = false;

  for (const key of required) {
    const prop = patchedProperties[key];
    if (!prop || typeof prop !== 'object') continue;

    if (prop.type === 'string' && prop.minLength === undefined) {
      patchedProperties[key] = { ...prop, minLength: 1 };
      changed = true;
    }
  }

  // Recurse into nested objects
  for (const key of Object.keys(patchedProperties)) {
    const prop = patchedProperties[key];
    if (prop && typeof prop === 'object' && prop.type === 'object') {
      const patched = enforceRequiredStringMinLength(prop as JsonSchema);
      if (patched !== prop) {
        patchedProperties[key] = patched;
        changed = true;
      }
    }
  }

  return changed
    ? ({ ...schema, properties: patchedProperties } as JsonSchema)
    : schema;
};

export const findProperty = <F extends Field>(
  column: F,
  schema: JsonSchema,
) => {
  //TODO check if we can use innerfunction for this
  //
  if (!column.scope) {
    return { id: null, property: null };
  }

  const id = column.scope?.substring('#/properties/'.length);
  const property = schema?.properties?.[id] ?? {};

  return { id, property } as { id: string; property: any };
};

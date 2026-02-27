// import { generateSchema } from '@anatine/zod-openapi';
import type { JsonSchema } from '@jsonforms/core';
import type { Layout } from '@jsonforms/core/src/models/uischema';
import type { ZodObject } from 'zod';
import { toJSONSchema } from 'zod';

export enum Size {
  xs = 'xs',
  sm = 'sm',
  lg = 'lg',
  xl = 'xl',
}

export type SizeType = keyof typeof Size;

export type JsonFormsLayout = {
  uiSchema: Layout;
  schema: JsonSchema;
  modalSize?: SizeType;
};

export type FormSchemaModel = {
  form: JsonFormsLayout;
  table?: JsonFormsLayout;
  filter?: JsonFormsLayout;

  uri: string;
  searchUri: string;
};

/**
 * If a property has `anyOf: [{type: T}, {type: "null"}]` (produced by Zod's `.nullable()`),
 * collapse it to `{type: T}` so JSON Forms testers (e.g. `schemaTypeIs('string')`) match correctly.
 */
const simplifyNullableAnyOf = (property: Record<string, unknown>): void => {
  const anyOf = property['anyOf'];
  if (!Array.isArray(anyOf) || anyOf.length !== 2) return;

  const nonNull = anyOf.find(
    (s: Record<string, unknown>) => s['type'] !== 'null',
  );
  const hasNull = anyOf.some(
    (s: Record<string, unknown>) => s['type'] === 'null',
  );

  if (nonNull && hasNull) {
    delete property['anyOf'];
    Object.assign(property, nonNull);
  }
};

const transformToJsonSchema = (schema: ZodObject<any>): JsonSchema => {
  const jsonSchema = toJSONSchema(schema, {
    unrepresentable: 'any',
    target: 'draft-07',
  });
  jsonSchema.additionalProperties = true;

  const properties = (jsonSchema as any).properties;
  if (properties) {
    for (const key of Object.keys(properties)) {
      simplifyNullableAnyOf(properties[key]);
    }
  }

  return jsonSchema as any;
};

export const createSchema = (props: {
  uiSchema: any;
  tableSchema?: JsonSchema;
  filterSchema?: JsonSchema;
  // TODO extract dto schema from uischema
  schema: ZodObject<any>;
  dtoSchema: ZodObject<any>;
  responseSchema?: ZodObject<any>;
  uri: string;
  searchUri?: string;
  modalSize?: SizeType;
}) => {
  if (!props.schema) {
    throw new Error('no schema provided');
  }
  const schema = props.schema;
  const dtoSchema = props.dtoSchema;

  const formSchema = transformToJsonSchema(dtoSchema);
  const optionalSchema = transformToJsonSchema(schema.partial());

  return {
    dtoSchema,
    responseSchema: props.responseSchema ?? dtoSchema,
    schema: {
      form: {
        uiSchema: props.uiSchema,
        schema: formSchema,
        modalSize: props.modalSize ?? 'sm',
      },
      table: props.tableSchema
        ? {
            uiSchema: props.tableSchema,
            schema: optionalSchema,
          }
        : undefined,
      filter: props.filterSchema
        ? {
            uiSchema: props.filterSchema,
            schema: optionalSchema,
          }
        : undefined,
      uri: props.uri,
      searchUri: props.searchUri ?? `${props.uri}?filter=`,
    } as FormSchemaModel,
  };
};

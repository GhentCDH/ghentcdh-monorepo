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

export type JsonFormsLayout = {
  uiSchema: Layout;
  // schema: JsonSchema;
  modalSize?: Size;
};

export type FormSchemaModel = {
  form: JsonFormsLayout;
  table?: JsonFormsLayout;
  filter?: JsonFormsLayout;

  uri: string;
  searchUri: string;
};

const transformToJsonSchema = (schema: ZodObject<any>): JsonSchema => {
  const jsonSchema = toJSONSchema(schema, {
    unrepresentable: 'any',
    target: 'draft-07',
  });

  return jsonSchema;
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
  modalSize?: Size;
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

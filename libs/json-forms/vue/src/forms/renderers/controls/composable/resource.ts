import axios from 'axios';
import { isUndefined } from 'lodash-es';
import { z } from 'zod';

import { uiFromJsonSchema } from '@ghentcdh/json-forms-core';
import { useApi } from '@ghentcdh/tools-vue';


export const MethodSchema = z.enum(['get', 'post', 'delete', 'put', 'patch']);
export type Method = z.infer<typeof MethodSchema>;
export const OperationSchema = z.object({
  uri: z.string(),
  method: MethodSchema,
});
export type Operation = z.infer<typeof OperationSchema>;
export const OperationsSchema = z.string().or(OperationSchema);
export const BooleanOperationSchema = z
  .boolean()
  .or(OperationSchema)
  .optional()
  .default(false);

const Operations = z.object({
  findAll: BooleanOperationSchema,
  findOne: BooleanOperationSchema,
  create: BooleanOperationSchema,
  update: BooleanOperationSchema,
  delete: BooleanOperationSchema,
  lookup: OperationsSchema.optional(),
});

type OperationKey = keyof z.infer<typeof Operations>;
const OperationMap: Record<OperationKey, Method> = {
  create: 'post',
  delete: 'delete',
  findAll: 'get',
  findOne: 'get',
  lookup: 'get',
  update: 'get',
};

export const ResourceSchema = z
  .object({
    id: z.string(),
    uri: z.string(),
    operations: Operations,
    schema: z
      .object({
        ui: z.any().optional(),
        data: z.any(),
      })
      .optional(),
  })
  .transform((data) => {
    const schema = data.schema;
    if (schema) {
      if (!schema.ui) {
        schema.ui = uiFromJsonSchema(schema.data);
      }
    }

    const operations = {} as Record<OperationKey, Operation | null>;

    for (const k in OperationMap) {
      const key = k as OperationKey;
      const defaultOperation = OperationMap[key];
      const operation = data.operations[key];

      const mapResourceSchema = () => {
        if (isUndefined(operation) || operation === false) return null;

        if (operation === true)
          return { uri: data.uri, method: defaultOperation } as Operation;
        if (typeof operation === 'string')
          return { uri: operation, method: 'get' } as Operation;
        return {
          uri: operation.uri,
          method: operation.method ?? defaultOperation,
        };
      };

      operations[key] = mapResourceSchema();
    }

    return {
      ...data,
      schema,
      operations,
    };
  });

export const getResourceSchema = async (
  resourceUri: string,
  skipAuth: boolean,
) => {
  const fetch = skipAuth ? axios : useApi();

  return fetch.get(resourceUri).then((response) => {
    const resource = ResourceSchema.safeParse(response.data);
    if (!resource.success)
      throw new Error(`Invalid resource schema: ${resource.error}`);
    return resource.data;
  });
};

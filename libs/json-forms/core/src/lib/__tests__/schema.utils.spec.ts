import type { JsonSchema } from '@jsonforms/core';
import { describe, expect, it } from 'vitest';

import { enforceRequiredStringMinLength } from '../schema.utils';

describe('enforceRequiredStringMinLength', () => {
  it('should add minLength: 1 to required string properties', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
      },
      required: ['name', 'age'],
    };

    const result = enforceRequiredStringMinLength(schema);

    expect(result.properties!['name']).toEqual({
      type: 'string',
      minLength: 1,
    });
    expect(result.properties!['age']).toEqual({ type: 'number' });
  });

  it('should not override existing minLength', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 3 },
      },
      required: ['name'],
    };

    const result = enforceRequiredStringMinLength(schema);

    expect(result.properties!['name']).toEqual({
      type: 'string',
      minLength: 3,
    });
  });

  it('should not affect optional string properties', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        nickname: { type: 'string' },
      },
      required: ['name'],
    };

    const result = enforceRequiredStringMinLength(schema);

    expect(result.properties!['name']).toEqual({
      type: 'string',
      minLength: 1,
    });
    expect(result.properties!['nickname']).toEqual({ type: 'string' });
  });

  it('should recurse into nested objects', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: {
            street: { type: 'string' },
          },
          required: ['street'],
        },
      },
    };

    const result = enforceRequiredStringMinLength(schema);
    const address = result.properties!['address'] as JsonSchema;

    expect(address.properties!['street']).toEqual({
      type: 'string',
      minLength: 1,
    });
  });

  it('should return schema unchanged when no required array', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    };

    const result = enforceRequiredStringMinLength(schema);

    expect(result).toBe(schema);
  });

  it('should return schema unchanged when no properties', () => {
    const schema: JsonSchema = { type: 'string' };

    const result = enforceRequiredStringMinLength(schema);

    expect(result).toBe(schema);
  });

  it('should not mutate the original schema', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    };

    enforceRequiredStringMinLength(schema);

    expect(schema.properties!['name']).toEqual({ type: 'string' });
  });
});
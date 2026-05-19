import axios from 'axios';

import type {
  AutocompleteAllOptions,
  AutocompleteRemoteOptions,
  AutocompleteResourceOptions
} from '@ghentcdh/json-forms-core';
import { useApi } from '@ghentcdh/tools-vue';

import { getResourceSchema } from './resource';

/**
 * Creates a fetch function for remote URI-based autocomplete.
 * Appends the search term directly to `options.uri` and extracts
 * results from `options.dataField` (defaults to `'data'`).
 */
const useRemoteOption = (options: AutocompleteRemoteOptions) => {
  return {
    fetchOptions: (searchTerm: string, signal: AbortSignal) => {
      const fetch = options.skipAuth ? axios : useApi();
      return fetch
        .get(`${options.uri}${searchTerm}`, { signal })
        .then((data: any) => data.data[options.dataField ?? 'data']);
    },
  };
};

/**
 * Creates a fetch function for resource-based autocomplete.
 *
 * Loads the resource definition via {@link getResourceSchema}, then uses
 * its `lookup` operation to search. If the resource supports `create`,
 * returns a form config (JSON Schema + UI schema) and a `create` callback
 * to allow inline creation of new entries from the autocomplete dropdown.
 */
const useResourceOptions = async (options: AutocompleteResourceOptions) => {
  const resource = await getResourceSchema(
    options.resource,
    options.skipAuth ?? false,
  );
  const fetch = options.skipAuth ? axios : useApi();
  const lookup = resource.operations.lookup!;
  return {
    fetchOptions: (searchTerm: string, signal: AbortSignal) => {
      const uri = lookup.uri.replace('{text}', searchTerm);
      const method = lookup.method;

      return fetch[method](uri, { signal }).then(
        (data: any) => data.data[options.dataField ?? 'data'],
      );
    },
    enableCreate: !!resource.operations.create,
    form: resource.operations.create
      ? {
          ui_schema: resource.schema!.ui,
          json_schema: resource.schema!.data,
          title: `Create new ${resource.id}`,
          create: async (data) => {
            const create = resource.operations.create!;
            return fetch[create.method](create.uri, data).then(
              (result) => result.data,
            );
          },
        }
      : null,
  };
};

/**
 * Resolves autocomplete configuration from control options.
 *
 * Dispatches to either {@link useRemoteOption} (when `uri` is set) or
 * {@link useResourceOptions} (when `resource` is set). Returns a unified
 * config object with `fetchOptions`, label/value keys, and optional
 * inline-create form details.
 */
export const useFetchOptions = async (options: AutocompleteAllOptions) => {
  let config = {};
  if (options.uri)
    config = useRemoteOption(options as AutocompleteRemoteOptions);
  if (options.resource)
    config = await useResourceOptions(options as AutocompleteResourceOptions);

  return {
    fetchOptions: null,
    labelKey: options.labelKey,
    valueKey: options.valueKey,
    enableCreate: options.enableCreate ?? false,
    form: null,
    ...config,
  };
};

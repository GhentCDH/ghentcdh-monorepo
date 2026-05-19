import axios from 'axios';

import type {
  AutocompleteAllOptions,
  AutocompleteRemoteOptions,
  AutocompleteResourceOptions
} from '@ghentcdh/json-forms-core';
import { useApi } from '@ghentcdh/tools-vue';

import { getResourceSchema } from './resource';

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

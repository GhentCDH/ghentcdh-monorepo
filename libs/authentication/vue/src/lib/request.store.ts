import { defineStore } from 'pinia';

import { useAuthenticationStore } from './authentication.store';

const AUTH_STORE_NAME = 'GHENT_CDH_HTTP_REQUEST';

// TODO add white list of request
type RequestOptions = {
  skipAuth?: boolean;
  queryParams?: Record<string, any>;
  contentType?: string;
};

type Error = {
  status: number;
  content: any;
};

export const useHttpStore = defineStore(AUTH_STORE_NAME, () => {
  const authStore = useAuthenticationStore();

  const makeRequest = async (
    url: string,
    requestInit: RequestInit,
    options: RequestOptions = { contentType: 'application/json' },
  ) => {
    const headers: Record<string, string> = {
      accept: 'application/json',
      ...(requestInit.headers ?? {}),
    } as Record<string, string>;

    if (options.contentType) {
      headers['Content-Type'] = options.contentType;
    }

    if (!options?.skipAuth) {
      await authStore.updateToken();
      headers['Authorization'] = `Bearer ${authStore.token()}`;
    }

    const _url = new URL(url, window.location.href);

    if (options?.queryParams) {
      for (const [key, value] of Object.entries(options.queryParams)) {
        _url.searchParams.set(key, value);
      }
    }

    const response = await fetch(_url.toString(), {
      ...requestInit,
      headers,
    });

    if (!response.ok) {
      if (!options?.skipAuth) {
        // TODO if response return 400 then redirect to login page
      }

      return Promise.reject({
        content: response.body,
        status: response.status,
      } as any);
    }

    return response.json();
  };

  return {
    get: <T>(url: string, options?: RequestOptions): Promise<T> =>
      makeRequest(url, { method: 'GET' }, options),
    postFile: <T>(
      url: string,
      file: File,
      data: any = {},
      options?: RequestOptions,
    ): Promise<T> => {
      const formData = new FormData();

      for (const name in data) {
        formData.append(name, data[name]);
      }

      formData.append('file', file);

      return makeRequest(
        url,
        {
          method: 'POST',
          body: formData,
        },
        { ...options, contentType: undefined },
      );
    },
    post: <T>(url: string, data: any, options?: RequestOptions): Promise<T> =>
      makeRequest(
        url,
        {
          method: 'POST',
          body: JSON.stringify(data),
        },
        options,
      ),
    patch: <T>(url: string, data: any, options?: RequestOptions): Promise<T> =>
      makeRequest(
        url,
        {
          method: 'PATCH',
          body: JSON.stringify(data),
        },
        options,
      ),
    delete: <T>(
      url: string,
      data?: any,
      options?: RequestOptions,
    ): Promise<T> =>
      makeRequest(
        url,
        {
          method: 'DELETE',
          body: JSON.stringify(data),
        },
        options,
      ),
  };
});

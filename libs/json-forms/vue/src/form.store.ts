// import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import type { FormSchemaModel } from '@ghentcdh/json-forms/core';
import { NotificationService } from '@ghentcdh/ui';

// TODO add warnings, success, ....
const defineStore=(...args)=>{ return null as any }
export const useFormStore = (name: string) =>
  defineStore(`ghentCDH_form_${name}`, () => {
    const uri = ref<string | null>(null);

    const httpRequest = useHttpRequest();

    const save = async <T>(id: string | null, data: T) => {
      if (!uri.value) return;

      const promise = id
        ? httpRequest.patch(`${uri.value}/${id}`, data)
        : httpRequest.post(uri.value, data);

      return promise
        .then(() => {
          NotificationService.success('Data saved');
        })
        .catch((error) => {
          console.error(error);

          NotificationService.error('Error saving data');
        });
    };

    const init = (schema: FormSchemaModel) => {
      if (uri.value === schema.uri) return;
      uri.value = schema.uri;
    };

    const deleteFn = async <T>(data: T & { id?: string }) => {
      await httpRequest
        .delete(`${uri.value}/${data.id}`)
        .then(() => {
          NotificationService.success('Data deleted');
        })
        .catch((error) => {
          console.error(error);

          NotificationService.error('Error deleting data');
        });
    };

    return {
      init,
      save,
      delete: deleteFn,
    };
  })();

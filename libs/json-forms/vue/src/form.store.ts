// import { defineStore } from 'pinia';
import type { FormSchemaModel } from '@ghentcdh/json-forms-core';
import { useApi } from '@ghentcdh/tools-vue';
import { NotificationService } from '@ghentcdh/ui';

export class FormStore {
  constructor(private readonly schema: Pick<FormSchemaModel, 'uri'>) {
    // if (this.uri.value === schema.uri) return;
    // uri.value = schema.uri;
  }

  private get uri() {
    return this.schema.uri;
  }

  public async delete<T>(data: T & { id?: string }) {
    return useApi()
      .delete(`${this.uri}/${data.id}`)
      .then(() => {
        NotificationService.success('Data deleted');
      })
      .catch((error) => {
        console.error(error);

        NotificationService.error('Error deleting data');
      });
  }

  public async save<T>(id: string | null, data: T) {
    if (!this.uri) return;

    const promise = id
      ? useApi().patch(`${this.uri}/${id}`, data)
      : useApi().post(this.uri, data);

    return promise
      .then(() => {
        NotificationService.success('Data saved');
      })
      .catch((error) => {
        console.error(error);

        NotificationService.error('Error saving data');
      });
  }
}

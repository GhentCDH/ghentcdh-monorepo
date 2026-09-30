import { NotificationService } from '@ghentcdh/ui';

import type { HttpClient } from './http-client';

export class FormStore {
  constructor(
    private readonly uri: string,
    private readonly http: HttpClient,
  ) {}

  public async delete<T>(data: T & { id?: string }) {
    return this.http
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
      ? this.http.patch(`${this.uri}/${id}`, data)
      : this.http.post(this.uri, data);

    return promise
      .then((response) => {
        NotificationService.success('Data saved');
        return response.data;
      })
      .catch((error) => {
        console.error(error);

        NotificationService.error('Error saving data');
      });
  }
  public async get<T>(id: string | null) {
    if (!this.uri) return;

    const promise = this.http.get(`${this.uri}/${id}`);

    return promise
      .then((response) => {
        return response.data as T;
      })
      .catch((error) => {
        console.error(error);

        NotificationService.error('Error loading data');
      });
  }
}

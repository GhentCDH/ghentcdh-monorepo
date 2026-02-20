import { computedAsync } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { extractFilters, RequestSchema } from '@ghentcdh/json-forms-core';
import { useApi } from '@ghentcdh/tools-vue';

type RequestData = any;

// TODO add sorting

class TableStore {
  private route = useRoute();
  private router = useRouter();

  private get httpRequest() {
    return useApi();
  }

  private requestData = ref<RequestData>(RequestSchema.parse(this.route.query));

  private _reload = ref(Date.now());
  public loading = ref(true);

  private uri = ref<string>('');

  public reload() {
    this._reload.value = Date.now();
  }

  public data = computedAsync(async () => {
    // Don't remove to listen on reload!
    const r = this._reload.value;

    if (!this.uri.value) return null;

    this.loading.value = true;

    if (this.requestData.value.page < 1) {
      this.requestData.value.page = 1;
    }

    const response = await useApi()
      .get<any>(this.uri.value, {
        params: this.requestData.value,
      })
      .catch((error) => {
        console.error(error);
        // TODO snackbar error
        return { data: [], request: { totalPages: 1, page: 1 } };
      })
      .finally(() => (this.loading.value = false));

    if (response.request.totalPages < response.request.page) {
      this.updateRequest({ page: response.request.totalPages });
    }
    return response;
  });

  private tableData = computed(() => {
    const d = this.data.value;
    return this.loading?.value ? [] : (d?.data ?? []);
  });

  private init = (url: string) => {
    this.uri.value = url;
  };

  private updateRequest = (data: Partial<RequestData>) => {
    this.requestData.value = { ...this.requestData.value, ...data };

    this.router.replace({
      query: {
        ...this.route.query,
        ...this.requestData.value,
      },
    });
  };

  public sort = (id: string) => {
    const sortDir =
      this.requestData.value.sort === id &&
      this.requestData.value.sortDir === 'asc'
        ? 'desc'
        : 'asc';
    this.updateRequest({ sort: id, sortDir });
  };

  public updatePage(page: number) {
    this.updateRequest({ page });
  }

  public updateFilters = (filters: Record<string, any>) => {
    const filter: string[] = [];

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      // TODO decide what is the operator
      const operator = value?.operator || 'contains';
      filter.push(`${key}:${value}:${operator}`);
    });

    this.updateRequest({ filter });
  };

  public sorting = computed(() => {
    const requestData = this.requestData.value;
    return {
      sortColumn: requestData.sort,
      sortDirection: requestData.sortDir ?? 'asc',
    };
  });

  public filters = computed(() =>
    extractFilters(this.requestData.value.filter),
  );
}

const tableCache = new Map<string, TableStore>();

export const useTableStore = (name: string) => {
  const tableStore = tableCache.get(name);

  if (tableStore) {
    return tableStore;
  }

  const newTableStore = new TableStore();
  tableCache.set(name, newTableStore);

  return newTableStore;
};

import { computedAsync } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { RequestSchema, extractFilters } from '@ghentcdh/json-forms-core';

type RequestData = any;

// TODO add sorting



class TableStore {
  private route = useRoute();
  private router = useRouter();
  private httpRequest = useHttpRequest();

  private requestData = ref<RequestData>(RequestSchema.parse(this.route.query));

  private reload = ref(Date.now());
  private loading = ref(true);

  private uri = ref<string>('');

  private data = computedAsync(async () => {
    // Don't remove to listen on reload!
    const r = this.reload.value;

    if (!this.uri.value) return null;

    this. loading.value = true;

    if (this.requestData.value.page < 1) {
      this.requestData.value.page = 1;
    }

    const response = await this.httpRequest
      .get<any>(this.uri.value, {
        queryParams: this.requestData.value,
      })
      .catch((error) => {
        console.error(error);
        // TODO snackbar error
        return { data: [], request: { totalPages: 1, page: 1 } };
      })
      .finally(() => (this.loading.value = false));

    if (response.request.totalPages < response.request.page) {
    this.  updateRequest({ page: response.request.totalPages });
    }
    return response;
  });

  private tableData = computed(() => {
    const d = this.data.value;
    return this.loading?.value ? [] : (d?.data ?? []);
  });

  private reloadFn = () => {
    this.reload.value = Date.now();
  };

  private init = (url: string) => {
    this.uri.value = url;
  };

  private updateRequest = (data: Partial<RequestData>) => {
    this. requestData.value = { ...this.requestData.value, ...data };

    this. router.replace({
      query: {
        ...this.route.query,
        ...this.requestData.value,
      },
    });
  };

  private sort = (id: string) => {
    const sortDir =
      this. requestData.value.sort === id &&this. requestData.value.sortDir === 'asc'
        ? 'desc'
        : 'asc';
    this.updateRequest({ sort: id, sortDir });
  };

  private updateFilters = (filters: Record<string, any>) => {
    const filter: string[] = [];

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      // TODO decide what is the operator
      const operator = value?.operator || 'contains';
      filter.push(`${key}:${value}:${operator}`);
    });

    this.updateRequest({ filter });
  };

  private  sortDirection = computed(() => this.requestData.value.sortDir);
  private  sortColumn = computed(() =>  this.requestData.value.sort);
  private  filters = computed(() => extractFilters( this.requestData.value.filter));

//   return {
//   data,
//   tableData,
//   sortDirection,
//   sortColumn,
//   filters,
//   loading,
//   init,
//   sort,
//   reload: reloadFn,
//   updatePage: (page: number) => updateRequest({ page }),
// updateFilters,
// };

}

const tableCache = new Map<string, TableStore>();

export const useTableStore = (name: string) =>{

  const tableStore = tableCache.get(name);

  if(tableStore){
    return tableStore
  }

  const newTableStore = new TableStore();
  tableCache.set(name, newTableStore);

  return newTableStore;
}

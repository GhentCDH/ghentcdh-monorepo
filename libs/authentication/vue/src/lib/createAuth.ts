import type { App} from 'vue';
import { markRaw, ref, watch } from 'vue';

import type { AuthOptions } from './auth.const';
import { auth_symbol } from './auth.const';
import { KeycloakAdapter } from './keycloak.adapter';

const DefaultOptions: AuthOptions = {
  skipAuthentication: false
};

export const createAuth = (options: AuthOptions) => {
  const initDone = ref(false);
  let keycloackAdapter: KeycloakAdapter;

  const intiKeyCloack = () => {
    return KeycloakAdapter.init().then((adapter) => {
      keycloackAdapter = adapter;
      initDone.value = true;

      return adapter;
    });
  };

  const token = () => keycloackAdapter?.token;

  const getAdapater = async (): Promise<KeycloakAdapter | undefined> => {
    if (!keycloackAdapter) {
      return intiKeyCloack();
    }

    if (!initDone.value) {
      await new Promise<void>((resolve) => {
        const unwatch = watch(initDone, (newValue) => {
          if (newValue) {
            unwatch();
            resolve();
          }
        });
      });
    }
  };

  const user = async () => {
    return (await getAdapater())?.userInfo;
  };

  const updateToken = async () => {
    return (await getAdapater())?.updateToken();
  };

  const _options = { ...DefaultOptions, ...options };

   
  const auth = markRaw({
    install(app: App) {

      app.config.globalProperties.$auth = _options;
      app.provide(auth_symbol, auth);

      // KeycloakAdapter.init().then((adapter) => {
      //   isAuthenticated.value = adapter.isAuthenticated;
      //   keycloackAdapter.value = adapter;
      //   initDone.value = true;
      //   return adapter;
      // });
    },
    updateToken,
    token,
    user,
    authOptions: _options
  });

  return auth;
};

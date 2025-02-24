import type { App } from 'vue';
import { markRaw, ref, watch } from 'vue';

import type { Auth, AuthOptions } from './auth.const';
import { auth_symbol } from './auth.const';
import { KeycloakAdapter } from './keycloak.adapter';

const DefaultOptions: Partial<AuthOptions> = {
  skipAuthentication: false,
};

export const createAuth = (options: AuthOptions) => {
  const initDone = ref(false);
  let keycloackAdapter: KeycloakAdapter;

  const _options = { ...DefaultOptions, ...options } as AuthOptions;

  const intiKeyCloack = async () => {
    const adapter = await KeycloakAdapter.init(options.keycloak);
    keycloackAdapter = adapter;
    initDone.value = true;
    return adapter;
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

  const auth = markRaw({
    install(app: App) {
      app.runWithContext(() => {
        app.config.globalProperties.$auth = _options;
        app.provide(auth_symbol, auth);

        console.log('setup done');
        // KeycloakAdapter.init().then((adapter) => {
        //   isAuthenticated.value = adapter.isAuthenticated;
        //   keycloackAdapter.value = adapter;
        //   initDone.value = true;
        //   return adapter;
        // });
      });
    },
    updateToken,
    token,
    user,
    options: _options,
  } as Auth);

  return auth;
};

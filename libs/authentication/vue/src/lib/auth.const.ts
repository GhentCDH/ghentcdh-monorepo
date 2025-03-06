import type { App } from 'vue';

import type { KeycloakConfig } from './keycloak.adapter';

export const auth_symbol = 'GHENTCDH_AUTHENTICATION';

export type AuthOptions = {
  // Default false
  skipAuthentication?: boolean;
  keycloak: KeycloakConfig;
};

export interface Auth {
  install: (app: App) => void;

  updateToken: () => Promise<void>;
  token: () => string;
  user: () => Promise<any>;
  logout: () => Promise<any>;
  isAuthenticated: () => Promise<boolean>;
  options: AuthOptions;
}

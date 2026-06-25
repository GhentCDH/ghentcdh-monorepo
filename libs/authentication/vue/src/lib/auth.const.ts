import type { App } from 'vue';

import type { KeycloakConfig } from './keycloak.adapter';

export const auth_symbol = 'GHENTCDH_AUTHENTICATION';

export type AuthOptions = {
  baseUrl: string;
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

const token_id = `${auth_symbol}_token`;
export const saveToken = (token: string) => {
  localStorage.setItem(token_id, token);
};

export const clearToken = () => {
  localStorage.removeItem(token_id);
};

export const getToken = () => {
  return localStorage.getItem(token_id) as string;
};

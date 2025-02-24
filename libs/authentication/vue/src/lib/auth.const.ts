import { App } from 'vue';

export const auth_symbol = 'GHENTCDH_AUTHENTICATION';

export type AuthOptions = {
  // Default false
  skipAuthentication?: boolean
};


export interface Auth {
  install: (app: App) => void;

  updateToken: () => Promise<void>;
  token: () => string;
  user: () => Promise<any>;
  isAuthenticated: () => Promise<boolean>;
  options: AuthOptions
}

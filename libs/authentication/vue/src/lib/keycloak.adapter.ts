import Keycloak from 'keycloak-js';

import { clearToken, saveToken } from './auth.const';

export type KeycloakConfig = {
  realm: string;
  url: string;
  clientId: string;
};

/* eslint-disable no-console */
export class KeycloakAdapter extends Keycloak {
  private constructor(config: KeycloakConfig) {
    super(config);
  }

  protected async initialize() {
    try {
      const authenticated = await this.init({
        onLoad: 'login-required',
      });

      if (authenticated) {
        console.log('User is authenticated');

        saveToken(this.token);
      } else {
        console.log('User is not authenticated');
        clearToken();
      }
    } catch (error) {
      console.error('Failed to initialize adapter:', error);
    }
  }

  static async instance(config: KeycloakConfig): Promise<KeycloakAdapter> {
    const instance = new KeycloakAdapter(config);
    await instance.initialize();
    return instance;
  }

  updateToken() {
    console.log('update the token');
    return super.updateToken(30);
  }
}

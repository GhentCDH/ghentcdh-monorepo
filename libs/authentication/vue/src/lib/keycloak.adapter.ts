import Keycloak from 'keycloak-js';

export type KeycloakConfig = {
  realm: string;
  url: string;
  clientId: string;
};

export class KeycloakAdapter extends Keycloak {
  private constructor(config: KeycloakConfig) {
    super(config);
  }

  private async initialize() {
    try {
      const authenticated = await this.init({
        onLoad: 'login-required',
      });
      if (authenticated) {
        console.log('User is authenticated');
      } else {
        console.log('User is not authenticated');
      }
    } catch (error) {
      console.error('Failed to initialize adapter:', error);
    }
  }

  static async init(config: KeycloakConfig): Promise<KeycloakAdapter> {
    const instance = new KeycloakAdapter(config);
    console.log('KeycloakAdapter', config);
    await instance.initialize();
    return instance;
  }

  get userInfo() {
    return this.idTokenParsed;
  }

  updateToken() {
    console.log('update the token');
    return super.updateToken(30);
  }

  get isAuthenticated() {
    return this.authenticated ?? false;
  }
}

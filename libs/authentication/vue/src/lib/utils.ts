import { inject } from 'vue';

import type { Auth} from './auth.const';
import { auth_symbol } from './auth.const';


export const useAuthenticate = () => {
  const auth = inject(auth_symbol) as Auth;
  if (!auth) {
    console.warn('No auth provided, authorized calls may not work');
  }

  return {
    isAuthenticated: () => !!auth.user(),
    getUser: () => auth.user(),
    logout: () => auth.logout(),
  };
};


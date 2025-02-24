import { inject } from 'vue';

import type { Auth} from './auth.const';
import { auth_symbol } from './auth.const';

/**
 * Get the user
 */
export const getUser = async () => {
  const auth = inject(auth_symbol) as unknown as Auth;

  return auth.user();
};

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = async () => {
  const auth = inject(auth_symbol) as unknown as Auth;

  return !!auth.user();
};

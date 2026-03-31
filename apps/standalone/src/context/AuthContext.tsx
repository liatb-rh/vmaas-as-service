import * as React from 'react';

export interface AuthState {
  username: string | null;
  loading: boolean;
  error: string | null;
}

export const AuthContext = React.createContext<AuthState>({
  username: null,
  loading: false,
  error: null,
});

export function useAuthValue(): AuthState {
  return React.useMemo(
    () => ({
      username: 'developer',
      loading: false,
      error: null,
    }),
    [],
  );
}

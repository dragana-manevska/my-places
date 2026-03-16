import { createContext, useContext, useState } from 'react';

export type AuthContextType = {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  setAuth: (token: string, userData: any) => void;
  clearAuth: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const setAuth = (token: string, userData: any) => {
    setAuthToken(token);
    setUser(userData);
  };

  const clearAuth = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        user,
        isAuthenticated: !!authToken,
        setAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider',
    );
  }
  return context;
};

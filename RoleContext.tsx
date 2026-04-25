import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type Role = 'farmer' | 'distributor' | null;

type RoleContextValue = {
  role: Role;
  loginAs: (role: Exclude<Role, null>) => void;
  logout: () => void;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);

  const loginAs = useCallback((newRole: Exclude<Role, null>) => {
    setRole(newRole);
  }, []);

  const logout = useCallback(() => {
    setRole(null);
  }, []);

  const value = useMemo(
    () => ({ role, loginAs, logout }),
    [role, loginAs, logout]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

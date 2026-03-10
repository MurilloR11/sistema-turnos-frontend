import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type UserEstado = 'normal' | 'embarazada' | 'adulto_mayor' | 'discapacitado/a';

const VALID_ESTADOS: ReadonlySet<string> = new Set<UserEstado>([
  'normal',
  'embarazada',
  'adulto_mayor',
  'discapacitado/a',
]);

export interface UserData {
  name: string;
  estado: UserEstado;
}

interface UserContextValue {
  name: string;
  estado: UserEstado | null;
  isRegistered: boolean;
  register: (data: UserData) => void;
  clear: () => void;
}

const STORAGE_KEY = 'app_user_data';

function isValidEstado(value: unknown): value is UserEstado {
  return typeof value === 'string' && VALID_ESTADOS.has(value);
}

function loadPersistedUser(): UserData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'name' in parsed &&
      'estado' in parsed &&
      typeof (parsed as UserData).name === 'string' &&
      (parsed as UserData).name.trim().length > 0 &&
      isValidEstado((parsed as UserData).estado)
    ) {
      return parsed as UserData;
    }
    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(loadPersistedUser);

  const register = useCallback((data: UserData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setUser(data);
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value: UserContextValue = {
    name: user?.name ?? '',
    estado: user?.estado ?? null,
    isRegistered: user !== null,
    register,
    clear,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (ctx === undefined) {
    throw new Error('useUser debe utilizarse dentro de un <UserProvider>');
  }
  return ctx;
}

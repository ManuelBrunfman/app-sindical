// Ejemplo en AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { User } from 'firebase/auth';
import { loginUser, registerUser, logoutUser } from '../services/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Función para guardar el usuario de forma persistente
  const persistUser = async (userData: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem('user', userData);
    } else {
      await SecureStore.setItemAsync('user', userData);
    }
  };

  // Función para cargar el usuario persistido
  const loadPersistedUser = async () => {
    let storedUser: string | null = null;
    if (Platform.OS === 'web') {
      storedUser = localStorage.getItem('user');
    } else {
      storedUser = await SecureStore.getItemAsync('user');
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  // Función para eliminar el usuario persistido
  const removePersistedUser = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem('user');
    } else {
      await SecureStore.deleteItemAsync('user');
    }
  };

  useEffect(() => {
    loadPersistedUser();
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await loginUser(email, password);
    setUser(loggedInUser);
    await persistUser(JSON.stringify(loggedInUser));
  };

  const register = async (email: string, password: string) => {
    const newUser = await registerUser(email, password);
    setUser(newUser);
    await persistUser(JSON.stringify(newUser));
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    await removePersistedUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

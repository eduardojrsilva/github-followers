import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { useToast } from './Toast';

import api from '../services/api';

interface User {
  name: string;
  company: string;
  location: string;
  bio: string;
  avatar_url: string;
  followers_url: string;
  following_url: string;
}

interface UserContextData {
  user: User;
  getUser: (username: string) => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  const { addToast } = useToast();

  const getUser = useCallback(
    async (username: string) => {
      try {
        const { data } = await api.get(`/users/${username}`);

        setUser(data);
      } catch {
        addToast({
          title: 'Erro',
          description: 'Erro ao buscar usuário',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  return <UserContext.Provider value={{ user, getUser }}>{children}</UserContext.Provider>;
};

function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export { UserProvider, useUser };

import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { useToast } from './Toast';

import api from '../services/api';

interface User {
  login: string;
  name: string;
  company: string;
  location: string;
  bio: string;
  avatar_url: string;
}

interface FollowUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface UserContextData {
  user: User;
  getUser: (username: string) => Promise<void>;
  getUsersDontFollowMe: () => Promise<FollowUser[]>;
  getUsersIdontFollow: () => Promise<FollowUser[]>;
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

  const getFollowers = useCallback(async () => {
    try {
      const { data } = await api.get<FollowUser[]>(`/users/${user.login}/followers`);

      return data;
    } catch {
      addToast({
        title: 'Erro',
        description: 'Erro ao buscar usuários',
        type: 'error',
      });
    }

    return [];
  }, [addToast, user.login]);

  const getFollowing = useCallback(async () => {
    try {
      const { data } = await api.get<FollowUser[]>(`/users/${user.login}/following`);

      return data;
    } catch {
      addToast({
        title: 'Erro',
        description: 'Erro ao buscar usuários',
        type: 'error',
      });
    }

    return [];
  }, [addToast, user.login]);

  const getUsersDontFollowMe = useCallback(async (): Promise<FollowUser[]> => {
    const followers = await getFollowers();
    const following = await getFollowing();

    const usersDontFollowMe = following.reduce((acc, followUser) => {
      if (followers.some(({ id }) => followUser.id === id)) return acc;

      return [...acc, followUser];
    }, [] as FollowUser[]);

    return usersDontFollowMe;
  }, [getFollowers, getFollowing]);

  const getUsersIdontFollow = useCallback(async (): Promise<FollowUser[]> => {
    const followers = await getFollowers();
    const following = await getFollowing();

    const usersIdontFollow = followers.reduce((acc, followUser) => {
      if (following.some(({ id }) => followUser.id === id)) return acc;

      return [...acc, followUser];
    }, [] as FollowUser[]);

    return usersIdontFollow;
  }, [getFollowers, getFollowing]);

  return (
    <UserContext.Provider value={{ user, getUser, getUsersDontFollowMe, getUsersIdontFollow }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export { UserProvider, useUser };

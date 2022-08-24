import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { useToast } from './Toast';

import { getFollowers, getFollowing, getUserInfo } from '../services/api';

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
  const [followers, setFollowers] = useState<FollowUser[]>([]);
  const [following, setFollowing] = useState<FollowUser[]>([]);

  const { addToast } = useToast();

  const getUser = useCallback(
    async (username: string) => {
      try {
        const userInfo = await getUserInfo(username);

        setUser(userInfo);
        setFollowers(await getFollowers(userInfo.login));
        setFollowing(await getFollowing(userInfo.login));
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

  const getUsersDontFollowMe = async (): Promise<FollowUser[]> => {
    const usersDontFollowMe = following.reduce((acc, followUser) => {
      if (followers.some(({ id }) => followUser.id === id)) return acc;

      return [...acc, followUser];
    }, [] as FollowUser[]);

    return usersDontFollowMe;
  };

  const getUsersIdontFollow = async (): Promise<FollowUser[]> => {
    const usersIdontFollow = followers.reduce((acc, followUser) => {
      if (following.some(({ id }) => followUser.id === id)) return acc;

      return [...acc, followUser];
    }, [] as FollowUser[]);

    return usersIdontFollow;
  };

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

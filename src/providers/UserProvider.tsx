import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { useToast } from './Toast';

import { getFollowers, getFollowing, getUserInfo } from '../services/api';
import { getUsersDontFollowMe, getUsersIdontFollow } from '../utils/user';

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
  usersDontFollowMe: FollowUser[];
  usersIdontFollow: FollowUser[];
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const PER_PAGE = 100;

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [usersDontFollowMe, setUsersDontFollowMe] = useState<FollowUser[]>([]);
  const [usersIdontFollow, setUsersIdontFollow] = useState<FollowUser[]>([]);

  const { addToast } = useToast();

  const getUser = useCallback(
    async (username: string) => {
      try {
        const userInfo = await getUserInfo(username);

        setUser(userInfo);

        const followers = await getFollowers(userInfo.login, PER_PAGE);
        const following = await getFollowing(userInfo.login, PER_PAGE);

        setUsersDontFollowMe(await getUsersDontFollowMe(followers, following));
        setUsersIdontFollow(await getUsersIdontFollow(followers, following));
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

  return (
    <UserContext.Provider value={{ user, getUser, usersDontFollowMe, usersIdontFollow }}>
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

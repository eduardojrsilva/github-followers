import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

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

export async function getUserInfo(username: string): Promise<User> {
  const { data } = await api.get<User>(`/users/${username}`);

  return data;
}

export async function getFollowers(user: string): Promise<FollowUser[]> {
  const { data } = await api.get<FollowUser[]>(`/users/${user}/followers`);

  return data;
}

export async function getFollowing(user: string): Promise<FollowUser[]> {
  const { data } = await api.get<FollowUser[]>(`/users/${user}/following`);

  return data;
}

export default api;

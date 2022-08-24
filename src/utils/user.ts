interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export async function getUsersDontFollowMe(followers: User[], following: User[]): Promise<User[]> {
  const usersDontFollowMe = following.reduce((acc, followUser) => {
    if (followers.some(({ id }) => followUser.id === id)) return acc;

    return [...acc, followUser];
  }, [] as User[]);

  return usersDontFollowMe;
}

export async function getUsersIdontFollow(followers: User[], following: User[]): Promise<User[]> {
  const usersIdontFollow = followers.reduce((acc, followUser) => {
    if (following.some(({ id }) => followUser.id === id)) return acc;

    return [...acc, followUser];
  }, [] as User[]);

  return usersIdontFollow;
}

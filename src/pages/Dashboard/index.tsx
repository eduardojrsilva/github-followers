import { useCallback, useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

import Header from '../../components/Header';
import SearchForm from './SearchForm';
import UserInfo from './UserInfo';

import { useUser } from '../../providers/UserProvider';

import { Content, Menu, MenuItem, NoUser, UserContainer, UsersList } from './styles';
import Loader from '../../components/Loader';

type MenuOptions = 'dontFollowMe' | 'IdontFollow';

interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const Dashboard: React.FC = () => {
  const [activeMenuTab, setActiveMenuTab] = useState<MenuOptions>('dontFollowMe');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsersList, setIsLoadingUsersList] = useState(false);

  const { user: myUser, getUsersDontFollowMe, getUsersIdontFollow } = useUser();
  const [usersList, setUsersList] = useState<User[]>([]);

  const getUsers = useCallback(async () => {
    setIsLoading(true);

    const users = await getUsersDontFollowMe();

    setActiveMenuTab('dontFollowMe');
    setUsersList(users);
    setIsLoading(false);
  }, [getUsersDontFollowMe]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myUser]);

  const handleChangeMenuTab = async (tab: MenuOptions): Promise<void> => {
    setActiveMenuTab(tab);
    setIsLoadingUsersList(true);

    if (tab === 'dontFollowMe') {
      setUsersList(await getUsersDontFollowMe());
    } else {
      setUsersList(await getUsersIdontFollow());
    }

    setIsLoadingUsersList(false);
  };
  return (
    <>
      <Header />
      <Content>
        <SearchForm />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {!myUser.name ? (
              <NoUser>
                <SearchIcon />
                <span>Busque por um usuário</span>
              </NoUser>
            ) : (
              <>
                <UserInfo />

                <div>
                  <Menu>
                    <ul>
                      <MenuItem $isActive={activeMenuTab === 'dontFollowMe'}>
                        <button type="button" onClick={() => handleChangeMenuTab('dontFollowMe')}>
                          Usuários que não me seguem de volta
                        </button>
                      </MenuItem>

                      <MenuItem
                        $isActive={activeMenuTab === 'IdontFollow'}
                        onClick={() => handleChangeMenuTab('IdontFollow')}
                      >
                        <button type="button">Usuários que não sigo de volta</button>
                      </MenuItem>
                    </ul>
                  </Menu>

                  <UsersList>
                    {isLoadingUsersList ? (
                      <Loader />
                    ) : (
                      <>
                        {!usersList.length ? (
                          <span>Não há usuários para exibir</span>
                        ) : (
                          usersList.map((user) => (
                            <UserContainer key={user.id}>
                              <div>
                                <img src={user.avatar_url} alt="" />
                                <strong>{user.login}</strong>
                              </div>

                              <a href={user.html_url} target="_blank" rel="noreferrer">
                                Perfil
                              </a>
                            </UserContainer>
                          ))
                        )}
                      </>
                    )}
                  </UsersList>
                </div>
              </>
            )}
          </>
        )}

        <div />
      </Content>
    </>
  );
};

export default Dashboard;

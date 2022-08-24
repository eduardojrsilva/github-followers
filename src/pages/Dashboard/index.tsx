import { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Paginator from '../../components/Paginator';
import SearchForm from './SearchForm';
import UserInfo from './UserInfo';

import { useUser } from '../../providers/UserProvider';

import { Content, Menu, MenuItem, NoUser, UserContainer, UsersList } from './styles';

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

  const { user: myUser, usersDontFollowMe, usersIdontFollow } = useUser();
  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    setIsLoading(true);

    setActiveMenuTab('dontFollowMe');
    setUsersList(usersDontFollowMe);
    setIsLoading(false);
  }, [usersDontFollowMe]);

  const handleChangeMenuTab = async (tab: MenuOptions): Promise<void> => {
    setActiveMenuTab(tab);
    setIsLoadingUsersList(true);

    if (tab === 'dontFollowMe') {
      setUsersList(usersDontFollowMe);
    } else {
      setUsersList(usersIdontFollow);
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
                          <Paginator items={usersList}>
                            {(displayUsers) => (
                              <>
                                {displayUsers.map((user) => (
                                  <UserContainer key={user.id}>
                                    <div>
                                      <img src={user.avatar_url} alt="" />
                                      <strong>{user.login}</strong>
                                    </div>

                                    <a href={user.html_url} target="_blank" rel="noreferrer">
                                      Perfil
                                    </a>
                                  </UserContainer>
                                ))}
                              </>
                            )}
                          </Paginator>
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

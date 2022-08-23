import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

import Header from '../../components/Header';
import { useUser } from '../../providers/UserProvider';

import SearchForm from './SearchForm';
import UserInfo from './UserInfo';

import { Content, Menu, MenuItem, NoUser, UsersList } from './styles';

type MenuOptions = 'dontFollowMe' | 'IdontFollow';

interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const Dashboard: React.FC = () => {
  const [activeMenuTab, setActiveMenuTab] = useState<MenuOptions>('dontFollowMe');
  const [usersList, setUsersList] = useState<User[]>([]);

  const { user: myUser } = useUser();

  const handleChangeMenuTab = (tab: MenuOptions): void => {
    setActiveMenuTab(tab);

    if (tab === 'dontFollowMe') {
      setUsersList([]);
    } else {
      setUsersList([]);
    }
  };
  return (
    <>
      <Header />
      <Content>
        <SearchForm />

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
                {!usersList.length ? (
                  <span>Não há usuários para exibir</span>
                ) : (
                  usersList.map((user) => (
                    <div key={user.id}>
                      <div>
                        <img src={user.avatar_url} alt="" />
                        <strong>{user.login}</strong>
                      </div>

                      <a href={user.html_url} target="_blank" rel="noreferrer">
                        Perfil
                      </a>
                    </div>
                  ))
                )}
              </UsersList>
            </div>
          </>
        )}
      </Content>
    </>
  );
};

export default Dashboard;

import { Buildings, MapPin } from 'phosphor-react';

import { useUser } from '../../../providers/UserProvider';

import { Container, Info } from './styles';

const UserInfo: React.FC = () => {
  const { user } = useUser();

  return (
    <Container>
      <img src={user.avatar_url} alt="" />

      <Info>
        <h2>{user.name}</h2>
        <span>{user.bio}</span>

        <div>
          {user.company && (
            <span>
              <Buildings />
              {user.company}
            </span>
          )}
          {user.location && (
            <span>
              <MapPin />
              {user.location}
            </span>
          )}
        </div>
      </Info>
    </Container>
  );
};

export default UserInfo;

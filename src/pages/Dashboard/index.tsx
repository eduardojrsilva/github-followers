import Header from '../../components/Header';

import SearchForm from './SearchForm';
import UserInfo from './UserInfo';

import { Content } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <Content>
        <SearchForm />
        <UserInfo />
      </Content>
    </>
  );
};

export default Dashboard;

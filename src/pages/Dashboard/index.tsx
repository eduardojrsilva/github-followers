import Header from '../../components/header';
import SearchForm from './SearchForm';
import { Content } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <Content>
        <SearchForm />
      </Content>
    </>
  );
};

export default Dashboard;

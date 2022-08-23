import Header from '../../components/Header';
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

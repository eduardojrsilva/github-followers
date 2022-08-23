import { Container, Content, Logo } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <Logo>
          <span>&#123;</span>
          <h1>GitHub_Followers</h1>
          <span>&#125;</span>
        </Logo>
      </Content>
    </Container>
  );
};

export default Header;

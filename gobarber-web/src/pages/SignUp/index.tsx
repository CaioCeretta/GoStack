import React from 'react';
import { FiLogIn, FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="Logo" />

      <form>
        <h1>Create Account</h1>

        <Input name="name" icon={FiUser} placeholder="Name" />

        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <Input
          name="password"
          icon={FiLock}
          type="text"
          placeholder="Password"
        />

        <Button type="submit">Register</Button>
      </form>

      <a href="login">
        <FiArrowLeft />
        Return to login
      </a>
    </Content>
  </Container>
);

export default SignUp;

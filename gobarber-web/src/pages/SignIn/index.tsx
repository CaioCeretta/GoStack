import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('The name is required'),
        email: Yup.string()
          .email('Type a valid e-mail address')
          .required('The email is required'),
        password: Yup.string().min(6, 'At least 6 characters'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err: any) {
      console.log(err);

      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Logo" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Login Here</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Entrar</Button>

          <a href="forgot">Forgot my password</a>
        </Form>

        <a href="">
          <FiLogIn />
          Create an account
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;

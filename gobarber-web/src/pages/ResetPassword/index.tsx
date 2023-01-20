import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface ResetPasswordFormData {
  newPassword: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          newPassword: Yup.string().min(6, 'At least 6 characters'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('newPassword'), null],
            'The passwords do not match',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { newPassword, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('password/reset', {
          token,
          newPassword,
          password_confirmation,
        });

        addToast({
          type: 'success',
          title: 'Password reset successfull',
          description:
            'Your password reset was a success, you can now login with the new password',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // trigger a toast

        addToast({
          type: 'error',
          title: 'Update error',
          description: 'An error has occurred on the password reset, try again',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Password Reset</h1>

            <Input
              name="newPassword"
              icon={FiLock}
              type="password"
              placeholder="New Password"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Password Confirmation"
            />

            <Button type="submit">Update Password</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ResetPassword;

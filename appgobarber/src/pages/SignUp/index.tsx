import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container, Title, BackToSignIn, BackToSignInText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: object) => {
      try {
          formRef.current?.setErrors({});

          const Schema = Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório'),
            email: Yup.string()
              .required('E-mail é obrigatório')
              .email('Digite um email válido'),
            password: Yup.string().min(
              6,
              'Senha precisa ter no minimo 6 digitos',
            ),
          });

          await Schema.validate(data, {
            abortEarly: false,
          });

          await api.post('users', data);

          Alert.alert(
            'Cadastro realizado com sucesso',
            'Você ja pode conectar-se à api',
          );

          navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer o cadastro',
        );
      }
    },
    [navigation],
  );
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title> Crie sua conta </Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                returnKeyType="next"
                placeholder="Nome"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                icon="mail"
                placeholder="E-mail"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => ({

                })}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
          </Container>

          <BackToSignIn
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para o Logon</BackToSignInText>
          </BackToSignIn>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;

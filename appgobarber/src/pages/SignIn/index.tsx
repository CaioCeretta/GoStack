import React, {useCallback, useRef} from 'react';
import * as Yup from 'yup';

import {useNavigation} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import {useAuth} from '../../hooks/auth';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

type Nav = {
  navigate: (value: string) => void;
};

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  // Recapitulando, usamos o ref quando queremos manipular os elementos de uma forma direta, e não por um evento
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<Nav>();

  const {signIn, user} = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail required')
            .email('Insert a valid e-mail'),
          password: Yup.string().required('Password required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current.setErrors(errors);
        }
      }

      // Alert.alert(
      //   'Error login in',
      //   'An error has occurred, check your credentials',
      // );
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Sign In</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current.submitForm()}
              />

              <View>
                <Button onPress={() => formRef.current.submitForm()}>
                  Sign In
                </Button>
              </View>
            </Form>

            <ForgotPassword onPress={() => navigation.navigate('Forgot')}>
              <ForgotPasswordText>Forgot my Password</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Feather name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Create new account</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;

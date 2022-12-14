import React, {useCallback, useRef} from 'react';
import * as Yup from 'yup';

import {RectButton} from 'react-native-gesture-handler';
import {Feather, FontAwesome} from '@expo/vector-icons';
import {
  Platform,
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Title, BackToSignIn, BackToSignInText} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

type Nav = {
  navigate: (value: string) => void;
};

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('The name is required'),
        email: Yup.string()
          .email('Type a valid e-mail address')
          .required('The email is required'),
        password: Yup.string()
          .min(6, 'At least 6 characters')
          .required('The password is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      Alert.alert(
        'Register successful!',
        'You can now log in to the application',
      );

      navigation.navigate('SignIn');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Register error',
          'An error has occurred creating your account, please try again',
        );
      }
    }
  }, []);

  return (
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
            <Title>Create Account</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Name"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current.focus();
              }}
            />

            <Input
              ref={emailInputRef}
              name="email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
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
              textContentType="newPassword"
              onSubmitEditing={() => formRef.current.submitForm()}
            />
            <View>
              <Button onPress={() => formRef.current.submitForm()}>
                Register
              </Button>
            </View>
          </Form>

          <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
            <Feather name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Back to Login</BackToSignInText>
          </BackToSignIn>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

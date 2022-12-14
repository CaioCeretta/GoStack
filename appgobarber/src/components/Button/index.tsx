import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';

import {Container, ButtonText} from './styles';

interface Props extends RectButtonProperties {
  title: string;
  children: string;
}

const Button: React.FC<Props> = ({children, title, ...rest}) => (
  <Container title {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;

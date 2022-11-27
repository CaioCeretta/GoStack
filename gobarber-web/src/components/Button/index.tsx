import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

/* O type e o interface são praticamente intercambiáveis, o type é basicamente uma forma de criar tipagens de
objetos que são compostas de outras tipagens */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;

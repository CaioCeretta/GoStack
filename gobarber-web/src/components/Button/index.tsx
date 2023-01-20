import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

/* O type e o interface são praticamente intercambiáveis, o type é basicamente uma forma de criar tipagens de
objetos que são compostas de outras tipagens */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Loading...' : children}
  </Container>
);

export default Button;

import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';

import Tooltip from '../Tooltip';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
  containerStyle?: object;
}

/* É preciso passar com a letra maiuscula porque aí o react vai entender que trata-se de um componente, no caso um ícone */
const Input: React.FC<InputProps> = ({
  name,
  containerStyle,
  icon: Icon,
  ...rest
}) => {
  const [focusedInput, setFocusedInput] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // Para o unform, nós precisamos dizer para quis campos queremos que ele traga o valor no momento do submit, um registro.

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name); // Recebe o name e retorna varias variáveis
  // register field é o que faz o registro da variável

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      /*
       Forma de acessar o elemento de uma forma direta, por exemplo o document.getElement(...).
       Dentro do react, utilizamos refs. Dentro do current é onde estará o valor do input. a ref terá o valor de
       do document.querySelector(input). E da maneira acima estamos dizendo para o unform que para quando ele precisar
       do valor do input, basta ele ir no atributo path, e verificar onde o valor está armazenado. Nesse caso no value
       */
    });
  }, [fieldName, registerField]);

  /* Uma coisa que temos que ter em mente, é que toda vez que uma função contém uma outra função dentro dela, toda vez
     que essa função externa for chamada, a que está dentro dela também será criada, então sempre que for criar uma
     função dentro de um componente, não será criada uma function, e sim um hook do react chamado useCallBack, que é uma
     forma de criar funções dentro do componente que não serão recriadas na memória todas as vezes que o componente for
     atualizado, e essas funções ficarão "memorizadas", logo, será criado uma constente com uma arrow function */

  const handleInputBlur = useCallback(() => {
    setFocusedInput(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={focusedInput}
    >
      {Icon && <Icon size={20} />}
      <input
        name={name}
        defaultValue={defaultValue}
        onFocus={() => setFocusedInput(true)}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          {error && <FiAlertCircle color="#c53030" size={20} />}
        </Error>
      )}
      {/* Esse error foi por causa de colocar o ref dentro do form e colocar o setErrors */}
    </Container>
  );
};

export default Input;

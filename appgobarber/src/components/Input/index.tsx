import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
/* useImperativeHandle faz com que voce pegue as informações do componente filho para o pai, apenas em momentos especificos */
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';

import {Container, TextInput, Icon} from './styles';

interface IProps extends TextInputProps {
  name: string;
  icon: string;
}

interface IInputValueRef {
  value: string; // valor do input
}

/* Recapitulando: Na interface a gente apenas define na interface as propriedades e as informnações que iremos utilizar
nunca iremos passar todas informações que uma propriedade terá */
interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, IProps> = (
  {name, icon, ...rest},
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputElementRef = useRef(null);

  const {registerField, defaultValue, fieldName, error} = useField(name);
  const inputValueRef = useRef<IInputValueRef>({value: defaultValue});

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  /*= > ({}) é o mesmo que () => {
    return ()
    Automaticamente faz o return
  } */

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  // Aulas Anteriores
  // useEffect(() => {
  //   registerField<string>({
  //     name: fieldName,
  //     ref: inputValueRef.current,
  //     path: 'value',
  //     setValue(ref: unknown, value) {
  //       inputValueRef.current.value = value;
  //       inputElementRef.current.setNativeProps({
  //         text: value,
  //       }); /* Essa linha muda visualmente o texto do input, pois o
  //       elemento dentro não está refletindo automaticamente o valor da referencia, pois não é um estado e não faz com
  //       que atualize. */
  //     },
  //     clearValue() {
  //       inputValueRef.current.value = '';
  //       inputElementRef.current.clear();
  //     },
  //   });
  // }, [fieldName, registerField]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={24}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);

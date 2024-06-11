import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IconName } from 'assets';
import { HomeLayout, TextCus, TextInputs, TouchCus, ViewCus } from 'components';
import { useAuth } from 'hooks';
import { NavigationService, RootStackParamList, Routes } from 'navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import { BaseStyle } from 'theme';
import { yupSchemaInputPassword } from 'utils';
import styles from './styles';
import { EnumOTP } from 'types';
type TFormInputPassword = {
  password: string;
};
const InputPassword: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'InputPassword'>>();
  const refInput = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    refInput.current?.focus();
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError,
  } = useForm<TFormInputPassword>({
    mode: 'onChange',
    resolver: yupResolver(yupSchemaInputPassword),
    defaultValues: {
      password: '',
    },
  });
  const { onLogin, loading, onForgotPasswordOTP } = useAuth();
  const onSubmitLogin = useCallback((value: TFormInputPassword) => {
    onLogin(
      {
        phoneNumber: route.params?.phone_number,
        password: value.password,
      },
      error => {
        if (!error) NavigationService.navigate(Routes.HomeTabs);
        setError('password', { message: error });
      },
    );
  }, []);
  const onForgotPassword = () => {
    onForgotPasswordOTP({
      phoneNumber: route.params?.phone_number,
      typeCheck: EnumOTP.FORGOT,
    });
  };
  return (
    <HomeLayout
      isForForm
      textBtn="auth.login"
      onPress={handleSubmit(onSubmitLogin)}
      styleContent={styles.content}
      disabled={(!isDirty && !isValid) || loading}
      loading={loading}
      header={{
        notGoBack: false,
      }}
      isDark>
      <ViewCus mt-30>
        <TextCus heading1 mb-8 useI18n textAlign="center">
          auth.login
        </TextCus>
        <TextCus mb-32 color-grey85 useI18n textAlign="center">
          auth.sub_login
        </TextCus>
        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              ref={refInput}
              onChangeText={onChange}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              value={value}
              placeholder="auth.enter_password"
              error={errors.password?.message}
              style={[isFocused && BaseStyle.boxShadow]}
              onFocus={() => setIsFocused(true)}
              isPassword
              leftIcon={IconName.Lock}
            />
          )}
        />
        <TouchCus onPress={onForgotPassword}>
          <TextCus useI18n color-blue47 textAlign="center">
            auth.forgot_password
          </TextCus>
        </TouchCus>
      </ViewCus>
    </HomeLayout>
  );
};
export default InputPassword;

import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeLayout, TextCus, ViewCus } from 'components';
import { useAuth } from 'hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BaseStyle } from 'theme';
import { CountDownRef, EnumOTP } from 'types';
import { yupSchemaOtp } from 'utils';
import { InputOtp } from './components';
import CountDown from './components/CountDown';
import { RootStackParamList } from 'navigation';

type TFormOtp = {
  otp: string;
};
const OTP: React.FC = () => {
  const refCountDown = useRef<CountDownRef>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'OTP'>>();
  const { onRequestOTP, onVerifyOTP, loading, onForgotPasswordOTP } = useAuth();
  const [reset, setReset] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [msgErr, setMsgErr] = useState<string>('');
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<TFormOtp>({
    mode: 'onChange',
    resolver: yupResolver(yupSchemaOtp),
    defaultValues: {
      otp: '',
    },
  });
  useEffect(() => {
    refCountDown.current?.setStart();
  }, []);

  const onHanleCheckOtp = useCallback(
    (value: TFormOtp) => {
      const { phoneNumber, typeCheck } = route.params;
      onVerifyOTP(
        {
          phoneNumber,
          typeCheck,
          otpCode: value.otp,
        },
        err => {
          setMsgErr(err);
        },
      );
    },
    [route.params, setError],
  );

  const onTimeup = () => {
    setTimeUp(!timeUp);
  };
  const onPressResend = useCallback(() => {
    setTimeUp(false);
    setReset(!reset);
    refCountDown.current?.setStart();
    if (route.params.typeCheck === EnumOTP.REGISTER) {
      onRequestOTP({
        ...route.params,
      });
      return true;
    }
    onForgotPasswordOTP({
      ...route.params,
    });
  }, [route.params, onRequestOTP, onForgotPasswordOTP]);

  return (
    <HomeLayout
      isForForm
      textBtn="auth.otp_title"
      onPress={handleSubmit(onHanleCheckOtp)}
      loading={loading}
      styleContent={[BaseStyle.wrapperContentAuth]}
      disabled={!isDirty && !isValid}
      isDark>
      <ViewCus items-center mt-30>
        <TextCus heading1 mb-12 useI18n textAlign="center">
          auth.otp_title
        </TextCus>
        <TextCus mb-4 color-grey85 useI18n textAlign="center">
          auth.otp_subtitle
        </TextCus>
        <TextCus bold useI18n textAlign="center">
          {route.params?.phoneNumber}
        </TextCus>
        <ViewCus mt-64>
          <Controller
            control={control}
            name="otp"
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <InputOtp
                onChange={onChange}
                pinCount={6}
                onCodeFilled={code => {
                  setValue('otp', code, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                error={errors.otp?.message}
              />
            )}
          />
        </ViewCus>
        <CountDown
          initialSeconds={120}
          onTimeup={onTimeup}
          reset={reset}
          ref={refCountDown}
          onPressResend={onPressResend}
          error={msgErr}
        />
      </ViewCus>
    </HomeLayout>
  );
};
export default OTP;

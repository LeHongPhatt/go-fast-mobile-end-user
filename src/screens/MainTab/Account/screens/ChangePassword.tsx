import { yupResolver } from '@hookform/resolvers/yup';
import { HomeLayout, TextCus, TextInputs, ViewCus } from 'components';
import { useAuth, useNotify } from 'hooks';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { yupChangePasswordSchema } from 'utils';

interface PageProps {}
type TFormChangePassword = {
  old_password: string;
  new_password: string;
  re_new_password: string;
};
const ChangePassword: React.FC<PageProps> = () => {
  const { userInfo, onChangePassword: changePassword, onLogin } = useAuth();
  const { t } = useTranslation();
  const { danger, success } = useNotify();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormChangePassword>({
    mode: 'onChange',
    resolver: yupResolver(yupChangePasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      re_new_password: '',
    },
  });
  const onChangePassword = useCallback((data: TFormChangePassword) => {
    onLogin(
      { phoneNumber: userInfo.phone_number, password: data.old_password },
      error => {
        if (!error) {
          changePassword(
            {
              oldPassword: data.old_password,
              newPassword: data.new_password,
              phoneNumber: userInfo.phone_number,
            },
            rs => {
              if (rs.status === 200) {
                success(t('success'), 'Đổi mật khẩu thành công');
                control._reset();
              } else {
                danger(t('error'), rs.errorMessage);
              }
            },
          );
        } else {
          if (error === 'Password is invalid') {
            control.setError('old_password', {
              message: 'Mật khẩu hiện tại không đúng',
              type: 'onChange',
            });
          } else {
            danger(t('error'), error);
          }
        }
      },
    );
  }, []);
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'account.change_password',
        iconColor: Colors.white,
      }}
      isForForm
      textBtn="continue"
      onPress={handleSubmit(onChangePassword)}
      styleContent={styles.container}>
      <ViewCus p-16>
        <Controller
          control={control}
          name="old_password"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.old_password"
              bold
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.old_password_input"
              error={errors.old_password?.message}
              isRequired
              isPassword
              style={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="new_password"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.new_password"
              bold
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.new_password_input"
              error={errors.new_password?.message}
              isRequired
              isPassword
              style={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="re_new_password"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.re_new_password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.re_new_password"
              error={errors.re_new_password?.message}
              isRequired
              isPassword
              style={styles.input}
              bold
            />
          )}
        />
        <ViewCus bg-greyF7 p-8 br-4>
          <TextCus bold color-grey85>
            Yêu cầu mật khẩu
          </TextCus>
          <ViewCus style={BaseStyle.flexRowCenter}>
            <ViewCus style={styles.dots} />
            <TextCus subhead color-grey85>
              Độ dài 6 - 16 ký tự
            </TextCus>
          </ViewCus>
          <ViewCus style={BaseStyle.flexRowCenter}>
            <ViewCus style={styles.dots} />
            <TextCus subhead color-grey85>
              Tối thiểu 6 ký tự, ít nhất 1 chữ hoa, 1 chữ thường và 1 số
            </TextCus>
          </ViewCus>
        </ViewCus>
      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    backgroundColor: Colors.transparent,
  },
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  dots: {
    width: 4,
    height: 4,
    backgroundColor: Colors.grey85,
    borderRadius: 4,
    marginRight: 8,
  },
});
export default ChangePassword;

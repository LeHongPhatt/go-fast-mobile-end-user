import { yupResolver } from '@hookform/resolvers/yup';
import { HomeLayout, TextInputs, ViewCus } from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { yupSchemaBiker } from 'utils';
type IFormBiker = {
  from: string;
  to: string;
};
const Biker: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormBiker>({
    mode: 'onChange',
    resolver: yupResolver(yupSchemaBiker),
    defaultValues: {
      from: '',
      to: '',
    },
  });
  const onSendRequest = useCallback((value: IFormBiker) => {
    NavigationService.navigate(Routes.FindCar, {
      type: 'bike',
    });
  }, []);
  return (
    <HomeLayout
      bgColor={Colors.main}
      styleContent={{ backgroundColor: Colors.white }}
      header={{
        title: 'biker.title',
        iconColor: Colors.white,
      }}
      isForForm
      textBtn="biker.send_request"
      onPress={handleSubmit(onSendRequest)}
      btnStyle={styles.btnStyle}>
      <ViewCus p-16>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="from"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.from?.message}
              placeholder="biker.enter_from"
              label="biker.from"
              bold
              isRequired
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="to"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.from?.message}
              placeholder="biker.enter_to"
              label="biker.to"
              bold
              isRequired
            />
          )}
        />
      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  btnStyle: {
    borderTopWidth: 1,
    borderTopColor: Colors.greyED,
  },
});
export default Biker;

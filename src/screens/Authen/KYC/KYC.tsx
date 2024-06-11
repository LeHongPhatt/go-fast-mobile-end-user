import {
  BottomSheetCommon,
  Buttons,
  HomeLayout,
  SelecterPicker,
  TextCus,
  TextInputs,
  ViewCus,
} from 'components';
import React, { useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BaseStyle, Colors } from 'theme';
import { ImageCropPicker } from './components';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCurrentDate, getImage, yupSchemaKYC } from 'utils';
import {
  IFormKYC,
  IRefBottom,
  SELECT_OPTION,
  dataGender,
  formatGender,
  formatNameGender,
} from 'types';
import { useAuth } from 'hooks';
import { NavigationService, RootStackParamList, Routes } from 'navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IconName } from 'assets';
import moment from 'moment';
import styles from 'components/BottomSheetAlert/styles';
import Icon from 'assets/svg/Icon';
import Toast from 'react-native-toast-message';

export default function KYC() {
  const refBirthday = useRef<IRefBottom>(null);
  const refGender = useRef<IRefBottom>(null);
  const refCreateAccount = useRef<IRefBottom>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'KYC'>>();
  const { userInfo } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IFormKYC>({
    mode: 'onChange',
    resolver: yupResolver(yupSchemaKYC),
    defaultValues: {
      fullName: userInfo?.full_name ?? '',
      phoneNumber: route.params?.phoneNumber ?? userInfo?.phone_number,
      email: userInfo?.email ?? '',
      address: userInfo.address ?? '',
      avatar: userInfo?.avatar
        ? getImage({
            image: userInfo?.avatar,
          })
        : '',
      birthday: moment(userInfo?.birthday, 'DD/MM/YYYY').isValid()
        ? moment(userInfo?.birthday, 'DD/MM/YYYY').format('DD/MM/YYYY')
        : '',
      gender: userInfo?.gender ? formatNameGender[userInfo?.gender] : 'Nữ',
    },
  });
  const { onHanldeKYCUser, loading, onLogin } = useAuth();
  const onSubmitKYC = useCallback(
    (value: IFormKYC) => {
      const form = {
        ...value,
        ...route.params,
        gender: formatGender[value.gender],
        birthday: moment(value.birthday, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      };

      if (userInfo?.id) {
        onHanldeKYCUser(
          {
            ...form,
            userId: userInfo?.id,
          },
          () => {
            Toast.show({
              type: 'success',
              text1: 'Cập nhật thông tin thành công',
            });
          },
        );
        return;
      }
      onHanldeKYCUser(
        {
          ...form,
        },
        () => {
          refCreateAccount.current?.show();
        },
      );
    },
    [userInfo?.id, onHanldeKYCUser],
  );
  const onLoginAccount = useCallback(() => {
    onLogin(
      {
        phoneNumber: route.params?.phoneNumber,
        password: route.params?.password,
      },
      () => {
        NavigationService.navigate(Routes.HomeTabs);
        refCreateAccount.current?.close();
      },
    );
  }, [onLogin, route.params]);
  return (
    <HomeLayout
      isForForm
      header={{
        title: 'auth.kyc',
      }}
      onPress={handleSubmit(onSubmitKYC)}
      textBtn="auth.update_kyc"
      styleContent={[BaseStyle.wrapperContentAuth]}
      disabled={loading}
      loading={loading}
      isDark>
      <ImageCropPicker
        control={control}
        onChangePicture={image => setValue('avatar', image)}
        isViewTouch={true}
      />
      <ViewCus>
        <Controller
          control={control}
          name="fullName"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.username"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              isRequired
              placeholder="account.enter_username"
              error={errors.fullName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.phone_number"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              isRequired
              placeholder="account.phone_number_input"
              error={errors.phoneNumber?.message}
              keyboardType="phone-pad"
              disabled={true}
              editable={false}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.email"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.email_input"
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="birthday"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.birthday"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.choose_birthday"
              error={errors.birthday?.message}
              rightIcon={IconName.Calander}
              isViewTouch
              onPress={() => refBirthday.current?.show()}
              type="none"
              isRequired
            />
          )}
        />
        <Controller
          control={control}
          name="gender"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.gender"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.choose_gender"
              onPress={() => refGender.current?.show()}
              isViewTouch
              type="none"
              rightIcon={IconName.ChevronRight}
              size={16}
              styleIconRight={{ transform: [{ rotate: '90deg' }] }}
              isRequired
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.address"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.address_input"
              error={errors.address?.message}
            />
          )}
        />
      </ViewCus>
      <BottomSheetCommon ref={refBirthday} hideBackdrop={false}>
        <SelecterPicker
          selectType={SELECT_OPTION.DATE_PICKER}
          selectOptionTitle="account.choose_birthday"
          onConfirmSelect={date => {
            setValue('birthday', moment(date).format('DD/MM/YYYY'), {
              shouldValidate: true,
              shouldTouch: true,
            });
            refBirthday.current?.close();
          }}
          onCancelSelect={() => refBirthday.current?.close()}
          maxDate={getCurrentDate()}
          selectedPickerDate={getValues('birthday')}
        />
      </BottomSheetCommon>
      <BottomSheetCommon ref={refGender} hideBackdrop={false}>
        <SelecterPicker
          selectType={SELECT_OPTION.OPTION_PICKER}
          selectOptionTitle="account.choose_gender"
          dataOptions={dataGender}
          onConfirmSelect={gender => {
            setValue('gender', gender.data, {
              shouldValidate: true,
              shouldTouch: true,
            });
            refGender.current?.close();
          }}
          selectedChooseOption={{
            index: dataGender.indexOf(getValues('gender')),
            data: getValues('gender'),
          }}
          onCancelSelect={() => refGender.current?.close()}
        />
      </BottomSheetCommon>
      <BottomSheetCommon ref={refCreateAccount} hideBackdrop={false}>
        <ViewCus style={styles.bgWhite} pb-10>
          <Icon.ICON_SUCCESS color={Colors.main} />
          <ViewCus style={[styles.pdHorzi50, styles.mgVertzi20]}>
            <TextCus
              useI18n
              mb-8
              heading1
              textAlign="center"
              color={Colors.main}>
              auth.create_account_success
            </TextCus>
            <TextCus useI18n textAlign="center" color={Colors.grey85}>
              auth.wellcome
            </TextCus>
            <TextCus textAlign="center" heading4 bold color-black3A>
              Go Fast
            </TextCus>
          </ViewCus>
          <ViewCus style={styles.bottomAction}>
            <Buttons
              style={[styles.flex1]}
              onPress={onLoginAccount}
              disabled={false}>
              <TextCus heading5 useI18n color={Colors.white}>
                bottom.home
              </TextCus>
            </Buttons>
          </ViewCus>
        </ViewCus>
      </BottomSheetCommon>
    </HomeLayout>
  );
}

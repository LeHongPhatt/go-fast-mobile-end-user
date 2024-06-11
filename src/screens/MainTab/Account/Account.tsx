import React, { useCallback, useRef } from 'react';
import { InteractionManager, StyleSheet } from 'react-native';

import {
  BottomSheetCommon,
  Buttons,
  HomeLayout,
  ImageCus,
  ScrollViewCus,
  TextCus,
  ViewCus,
} from 'components';
import { BaseStyle, Colors } from 'theme';
import { ListItem } from './components';
import { NavigationService, Routes } from 'navigation';
import { IconName } from 'assets';
import { useAuth } from 'hooks';
import { IRefBottom } from 'types';
import Icon from 'assets/svg/Icon';
import { getImage } from 'utils';

export default function Account() {
  const { onLogout, user } = useAuth();
  const refBottom = useRef<IRefBottom>(null);
  const { userInfo } = useAuth();
  const onConfirmLogout = useCallback(() => {
    refBottom.current?.show();
  }, [onLogout]);
  const onLogin = useCallback(() => {
    NavigationService.reset(Routes.InputPhone);
  }, []);
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'bottom.account',
        notGoBack: true,
        iconColor: Colors.white,
      }}>
      <ScrollViewCus contentContainerStyle={styles.container}>
        <ViewCus style={[BaseStyle.wrapperMain]}>
          <ImageCus
            style={styles.image}
            source={{ uri: getImage({ image: userInfo?.avatar }) }}
          />
        </ViewCus>
        <ListItem
          name="account.user_info"
          onPress={() => NavigationService.navigate(Routes.KYC)}
          icon={IconName.CreditCard}
          isHiden={Boolean(user?.accessToken)}
        />
        <ListItem
          name="account.support"
          onPress={() => NavigationService.navigate(Routes.ContactSupport)}
          icon={IconName.Phone}
          isHiden={true}
        />
        <ListItem
          name="account.term"
          onPress={() => NavigationService.navigate(Routes.Term)}
          icon={IconName.Term}
          isHiden={true}
        />
        <ListItem
          name="account.change_password"
          onPress={() => NavigationService.navigate(Routes.ChangePassword)}
          icon={IconName.PassLock}
          isHiden={Boolean(user?.accessToken)}
        />
        <ListItem
          name={user?.accessToken ? 'account.logout' : 'auth.login'}
          isLine
          onPress={user?.accessToken ? onConfirmLogout : onLogin}
          icon={IconName.Logout}
          isHiden={true}
        />
      </ScrollViewCus>
      <BottomSheetCommon ref={refBottom} hideBackdrop={false}>
        <ViewCus style={styles.bgWhite} pb-10>
          <ViewCus items-center>
            <Icon.ICON_ERROR />
          </ViewCus>
          <ViewCus style={[styles.pdHorzi50, styles.mgVertzi20]}>
            <TextCus useI18n mb-8 heading1 textAlign="center">
              Xác nhận
            </TextCus>
            <TextCus useI18n textAlign="center" color={Colors.grey85}>
              Bạn có chắc chắn muốn đăng xuất?
            </TextCus>
          </ViewCus>
          <ViewCus style={styles.bottomAction}>
            <Buttons
              style={[styles.btnAction, styles.actionLogout]}
              onPress={() => {
                refBottom.current?.close();
                InteractionManager.runAfterInteractions(() => {
                  onLogout();
                });
              }}
              disabled={false}>
              <TextCus useI18n heading5 color-main>
                Đăng xuất
              </TextCus>
            </Buttons>
            <Buttons
              style={[styles.btnAction]}
              onPress={() => refBottom.current?.close()}
              disabled={false}>
              <TextCus heading5 useI18n color={Colors.white}>
                Đóng
              </TextCus>
            </Buttons>
          </ViewCus>
        </ViewCus>
      </BottomSheetCommon>
    </HomeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyF7,
  },
  btnCancel: {
    borderWidth: 1,
    borderColor: Colors.main,
    backgroundColor: Colors.transparent,
  },
  image: {
    height: 62,
    width: 62,
    borderRadius: 31,
    alignSelf: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: Colors.white,
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  pdHorzi50: {
    paddingHorizontal: 50,
  },
  mgVertzi20: {
    marginVertical: 20,
  },
  btnAction: {
    flex: 1,
    borderRadius: 6,
  },
  bottomAction: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  actionLogout: {
    marginRight: 10,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.main,
  },
});

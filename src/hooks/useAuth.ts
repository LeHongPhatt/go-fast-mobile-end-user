import { API_HOST } from '@env';
import { NavigationService, Routes } from 'navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from 'store/user';
import { UserSelectors } from 'store/user';
import {
  IFormDataLogin,
  IFormVerifyOTP,
  IKYCParams,
  IResponse,
  IUser,
  IUserInfo,
} from 'types';
import { InteractionManager } from 'react-native';
import {
  API_ENDPOINT,
  EnumOTP,
  EnumStatusLog,
  KEY_CONTEXT,
  RESTAURANT_KEY,
  uploadFormData,
} from 'utils';
import { useKey } from './useKey';
import { useNotify } from './useNotify';
import {
  onCloseModal,
  onShowModal,
} from 'components/BottomSheetAlert/BottomSheetAlert';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { danger } = useNotify();
  const { saveKeyStore, resetKeyStore } = useKey();
  const { t } = useTranslation();
  const loading = useSelector(UserSelectors.getLoading);

  const user =
    (useSelector(UserSelectors.getAttrByKey('user')) as IUser) || null;
    console.log('===========user==========', user);

  const status = useSelector(UserSelectors.getAttrByKey('status'));
  console.log('===========status==========', status);

  const userInfo = useSelector(
    UserSelectors.getAttrByKey('userInfo'),
  ) as IUserInfo;
  console.log('===========userInfo==========', userInfo);

  const onRequestOTP = useCallback(
    async (formData: IFormDataLogin) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData,
            endPoint: API_ENDPOINT.AUTH.REQUEST_OTP,
          },
          async res => {
            console.log('===========ress==========', res);
            if ([200, 406].includes(res?.status)) {
              const data = res?.data?.result?.[0] || '';
              const r = res?.status === 406 ? Routes.InputPassword : Routes.OTP;
              NavigationService.navigate(r, {
                ...data,
                phone_number: formData.phoneNumber,
                ...formData,
                typeCheck: EnumOTP.REGISTER,
              });
            } else {
              danger(t('error'), `${API_HOST}${JSON.stringify(res)}`);
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  const onVerifyOTP = useCallback(
    async (formData: IFormVerifyOTP, callback: (error: string) => void) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData,
            endPoint: API_ENDPOINT.AUTH.VERIFY_OTP,
          },
          async res => {
            if (res?.status === 200) {
              const data = res.data.result[0] || {};
              NavigationService.navigate(Routes.ResetPassword, {
                ...data,
                ...formData,
              });
            } else {
              callback?.(res?.data?.message ?? '');
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  const onForgotPasswordOTP = (formData: IFormVerifyOTP) => {
    const { phoneNumber, typeCheck } = formData;
    dispatch(
      UserActions.postBaseActionsRequest(
        {
          formData: { phoneNumber },
          endPoint: API_ENDPOINT.AUTH.FORGOT_PASSWORD_OTP,
        },
        async res => {
          if (res?.status === 200) {
            const data = res.data.result[0] || {};
            NavigationService.navigate(Routes.OTP, {
              ...data,
              ...formData,
              typeCheck,
            });
          } else {
            danger(t('error'), `${res?.data?.message}`);
          }
        },
      ),
    );
  };

  const getProfileUser = useCallback(() => {
    dispatch(
      UserActions.getBaseActionsRequest({
        dataKey: 'userInfo',
        endPoint: API_ENDPOINT.AUTH.GET_PROFILE,
        isObject: true,
      }),
    );
  }, []);

  const onLogin = useCallback(
    ({ phoneNumber, password }, callback?: (error?: string) => void) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData: { phoneNumber, password },
            dataKey: 'user',
            isObject: true,
            endPoint: API_ENDPOINT.AUTH.LOGIN,
          },
          res => {
            const data = res?.data;
            if (res?.status === 200) {
              saveKeyStore(RESTAURANT_KEY.STATUS_USER, EnumStatusLog.LOGIN);
              const result = data?.result[0] || {};
              saveKeyStore(KEY_CONTEXT.ACCESS_TOKEN, result.accessToken);
              saveKeyStore(KEY_CONTEXT.USER, JSON.stringify(result));
              getProfileUser();
              callback?.();
            } else {
              callback?.(data?.message ?? '');
            }
          },
        ),
      );
    },
    [danger, dispatch, t, getProfileUser],
  );

  const onResetPassword = useCallback(
    async (
      { password, phoneNumber, typeCheck },
      cb?: (data: IResponse) => void,
    ) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData: { password, phoneNumber },
            endPoint:
              typeCheck === EnumOTP.REGISTER
                ? API_ENDPOINT.AUTH.CREATE_USER
                : API_ENDPOINT.AUTH.FORGOT_PASSWORD,
          },
          async res => {
            cb?.(res);
            if (res?.status === 200) {
              onShowModal({
                type: 'success',
                title: 'Đổi mật khẩu thành công',
                subtitle: 'Vui lòng đăng nhập để tiếp tục',
                textOk: 'Đăng nhập',
                onOk: () => {
                  onCloseModal();
                  InteractionManager.runAfterInteractions(() => {
                    NavigationService.navigate(Routes.InputPhone);
                  });
                },
              });
            } else {
              danger(t('error'), `${res?.data?.message}`);
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  const onChangePassword = useCallback(
    async (
      { oldPassword, phoneNumber, newPassword },
      cb?: (data: IResponse) => void,
    ) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData: { oldPassword, phoneNumber, newPassword },
            endPoint: API_ENDPOINT.AUTH.CHANGE_PASSWORD,
          },
          async res => {
            if (res?.status === 200) {
              cb?.(res);
            } else {
              danger(t('error'), `${res?.data?.message}`);
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  const onLogout = useCallback(async () => {
    await resetKeyStore();
    dispatch(UserActions.logoutRequest({ redirect: true }));
  }, [danger, dispatch, t]);

  const workingStatusAction = useCallback(
    async (params: string) => {
      dispatch(UserActions.changeRestStatus(params));
    },
    [danger, dispatch, t],
  );

  const onHanldeKYCUser = useCallback(
    (
      { phoneNumber, password, userId, ...rest }: IKYCParams,
      callback: () => void,
    ) => {
      const _formData = uploadFormData({ ...rest, phoneNumber, password });
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData: _formData,
            endPoint: `${API_ENDPOINT.AUTH.KYC_USER}${
              userId ? `/${userId}` : ''
            }`,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
          res => {
            if (res.status === 200 && !userId) {
              callback?.();
            } else if (res.status === 200 && userId) {
              callback?.();
              dispatch(UserActions.updateProfile(res.data.result[0]));
            } else {
              danger(t('error'), 'Vui lòng thử lại');
            }
          },
        ),
      );
    },
    [],
  );
  const onShowFirstIntro = useCallback(() => {
    dispatch(UserActions.isShowIntro());
    saveKeyStore(KEY_CONTEXT.CHECKINTRO, 'Y');
  }, []);
  return {
    user,
    loading,
    status,
    userInfo,
    onRequestOTP,
    onVerifyOTP,
    onResetPassword,
    onLogin,
    onLogout,
    workingStatusAction,
    getProfileUser,
    onForgotPasswordOTP,
    onHanldeKYCUser,
    onShowFirstIntro,
    onChangePassword,
  };
};

import { ReactNode } from 'react';
import { EnumOTP, ICategoriesState, IHomeState, IOrdersState } from 'types';
import { IFormImgData, IUser, IUserInfo } from './user';
import { Source } from 'react-native-fast-image';
import { ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Routes } from 'navigation';

/**
 * @description the interface of user authentication entity
 * @export
 * @interface IAppState
 */
export interface IAppState {
  loading: boolean;
  language: string;
  error: string | null;
  isAuth: boolean;
  user?: IUser | null;
  status: string;
  userInfo?: IUserInfo | null;
  isShowIntro?: boolean;
  previousPath?: Routes;
}
export interface IDriverState {
  loading: boolean;
  error: string | null;
  list?: any[] | null;
  listDetail?: any[] | null;
  listUser?: any[] | null;
}
export interface IPayloadHome {
  isObject?: boolean;
  redirect?: boolean;
  isPaginate?: boolean;
  formData?: any; // IParamsRequest;
  dataKey?:
    | keyof IAppState
    | keyof IDriverState
    | keyof IHomeState
    | keyof ICategoriesState
    | keyof IOrdersState;
  isPagination?: boolean;
  type?: string | undefined | null;
  endPoint?: string;
  headers?: any;
  params?: any;
}
export interface IDataResponse {
  errorCode?: string;
  message?: string;
  result: any[];
}

export interface IResponse {
  status: number;
  data: IDataResponse;
  errorMessage: '';
}

export type ICallback = (results: IResponse) => void;

export interface IHomeActionPayload {
  payload: IPayloadHome;
  callback?: ICallback;
}

export enum ELanguage {
  VI = 'vi',
  EN = 'en',
}

/**
 * @description the interface of user login entity
 * @export
 * @interface IFormDataLogin
 */
export interface IFormDataLogin {
  phoneNumber?: string;
  email?: string;
  otpCode?: string;
  typeCheck?: string;
  password?: string;
  rePassword?: string;
  confirmPassword?: string;
}

export interface IFormVerifyOTP {
  phoneNumber: string;
  otpCode?: string;
  typeCheck: EnumOTP.FORGOT | EnumOTP.REGISTER;
}
export interface IUserKYC {
  name: string;
  phone: string;
  email?: string;
  bank_account?: string;
  cccd_front?: string;
  cccd_back?: string;
  gpkd_front?: string;
  gpkd_back?: string;
  birthday?: string;
  address?: string;
}

export interface IFormLoginNonePass {
  phonenumber: string;
  secKey: string;
  captcha: string;
  newPassword?: string;
  route?: string;
  refreshToken?: string;
}

export interface IFormLoginGuest {
  secKey: string;
  phonenumber?: string; //'',
  password?: string; //'',
  mail?: string; //BaseSetting.EMAIL_GUEST,
  captcha?: string; //'',
  token?: string; //BaseSetting.TOKEN,
}

export interface IFormForgotPassword {
  email?: string;
  phone?: string;
  confirmCode?: string;
  captcha: string;
  route?: string;
}

/**
 * @description the interface of user register entity
 * @export
 * @interface IFormRegisterData
 */
export interface IFormRegisterData {
  name: string;
  email: string;
  phonenumber: string;
  operatorid?: string;
  reference1?: string;
  reference2?: string;
  captcha?: string;
  confirmKey?: string;
  route?: string;
  dataImage?: IFormImgData;
}

/**
 * @description the interface of user login entity
 * @export
 * @interface ILoginParams
 */
export interface ILoginParams {
  account: string;
  password: string;
  seckey?: string;
}

export interface IRefreshParams {
  token: string;
  refreshToken: string;
}

/**
 * @description the interface of request body entity
 * @export
 * @interface IAppState
 */
export interface IPageData<T = any> {
  page: number;
  limit: number;
  query?: T;
}

/**
 * @description the interface of axios response entity
 * @export
 * @interface IAxiosResponse
 */
export interface IAxiosResponse<T = any> {
  status: number;
  message: number;
  payload?: T;
}

export interface IActivityProps {
  animating?: boolean;
  color?: string;
  size?: string | any;
  loading?: boolean;
  backdropColor?: string;
}

export interface IAnimatedProps {
  children?: ReactNode;
  style?: any;
  duration?: number;
  toValue?: number;
  useNativeDriver?: boolean;
  type?: any;
}

export enum EAction {
  SEARCH = 'search',
  PIN = 'pin',
  UNPIN = 'unpin',
  NOTI_OFF = 'off',
  NOTI_ON = 'on',
  LEAVE = 'leave',
  DONE = 'done',
  PENDING = 'pending',
  REACT = 'react',
  RECEIVED = 'receive',
  CANCELED = 'canceled',
  COMPLAIN = 'complain',
  HOMEPAGE = 'homepage',
  MENU = 'menu',
}

export enum EActionModal {
  LOGIN = 'login',
  ADDNEW = 'add_new',
  EDIT = 'edit',
  WORKING_STATUS = 'working_status',
}

export interface IBankAccount {
  bank_name: string;
  owner: string;
  account_number?: string;
}
export type IChangePassword = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

export interface IMainLayoutProps {
  children?: React.ReactNode;
  renderLeft?: () => React.ReactNode;
  bgColor?: string;
  isDark?: boolean;
  header?: IHeader;
  setAction?: any;
  action?: string;
  isWorking?: boolean;
  isForForm?: boolean;
  textBtn?: string;
  showHeader?: boolean;
  styleContent?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  btnStyle?: StyleProp<ViewStyle>;
  styleBtnCover?: StyleProp<ViewStyle>;
}

export interface IHeader {
  style?: StyleProp<ViewStyle>;
  styleLeft?: StyleProp<ViewStyle>;
  styleCenter?: StyleProp<ViewStyle>;
  styleRight?: StyleProp<ViewStyle>;
  styleRightSecond?: StyleProp<ViewStyle>;
  renderCenter?: () => ReactNode;
  renderLeft?: () => ReactNode;
  renderRight?: () => ReactNode;
  renderRightSecond?: () => ReactNode;
  onPressRightSecond?: () => void;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  title?: string;
  subTitle?: string;
  barStyle?: string;
  notGoBack?: boolean;
  showCenter?: boolean;
  showRight?: boolean;
  iconColor?: string;
}
export interface IRefBottom {
  show: () => void;
  close: () => void;
}

export interface IIntroSilde {
  index: number;
  image: Source;
  title: string;
  subtitle: string;
}
export interface CountDownProps {
  initialSeconds: number;
  onTimeup: () => void;
  styleTextTime?: TextStyle;
  visible?: boolean;
  reset?: boolean;
  error?: string;
  onPressResend?: () => void;
}
export interface CountDownRef {
  setPause: () => void;
  setStart: () => void;
}

export interface ILocationState {
  location: {
    lat: number;
    long: number;
  };
}
export interface IPage {
  page: number;
  limit: number;
  distance?: number;
  search?: string;
}

export enum ENodata {
  NODATA_FOOD = 'NODATA_FOOD',
  NODATA_COSMETIC = 'NODATA_COSMETIC',
  NODATA_DELIVERY = 'NODATA_DELIVERY',
  NODATA_BIKER = 'NODATA_BIKER',
  NODATA_DRINK = 'NODATA_DRINK',
  NODATA_BOOKING = 'NODATA_BOOKING',
  NODATA_PROMOTION = 'NODATA_PROMOTION',
  NODATA_MOTORBIKE_BOOKING = 'NODATA_MOTORBIKE_BOOKING',
  NODATA_DOMESTIC_WOKER = 'NODATA_DOMESTIC_WOKER',
}
export const ICON_NO_DATA: Record<ENodata, string> = {
  [ENodata.NODATA_FOOD]: 'NODATA_FOOD',
  [ENodata.NODATA_COSMETIC]: 'NODATA_COSMETIC',
  [ENodata.NODATA_DELIVERY]: 'NODATA_DELIVERY',
  [ENodata.NODATA_BIKER]: 'NODATA_BIKER',
  [ENodata.NODATA_DRINK]: 'NODATA_FOOD',
  [ENodata.NODATA_BOOKING]: 'NODATA_BIKER',
  [ENodata.NODATA_PROMOTION]: 'NODATA_FOOD',
  [ENodata.NODATA_MOTORBIKE_BOOKING]: 'NODATA_BIKER',
  [ENodata.NODATA_DOMESTIC_WOKER]: 'NODATA_DELIVERY',
};

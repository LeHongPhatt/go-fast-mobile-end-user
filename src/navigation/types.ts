import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { EnumOTP, FindCarType } from 'types';
import { Routes } from './Routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Categories: undefined;
  Intro: undefined;
  HomeTabs: undefined;
  SuggestForYou: undefined;
  InputPhone: {
    back?: Routes;
  };
  CartOrder: {
    distance: number;
    title: string;
  };
  CheckOrder: undefined;
  MethodPayment: undefined;
  Delivery: {
    order_code?: string;
  };
  FindCar: {
    type?: FindCarType;
  };
  DeliveryAddress: undefined;
  InputAddress: {
    callback: (address: any) => void;
  };
  HistoryActivity: undefined;
  Biker: undefined;
  Notification: undefined;
  ChangePassword: undefined;
  ContactSupport: undefined;
  InfoUser: undefined;
  Term: undefined;
  RequestDelivery: undefined;
  Rating: {
    type?: string;
  };
  RatingBiker: undefined;
  RatingRestaurant: undefined;
  Promotion: {
    backPath: string;
    params?: {
      restaurantId: string;
    };
  };
  OTP: {
    phoneNumber: string;
    typeCheck: EnumOTP.FORGOT | EnumOTP.REGISTER;
  };
  Register: {
    phoneNumber: string;
    typeCheck: EnumOTP.FORGOT | EnumOTP.REGISTER;
  };
  InputPassword: {
    phone_number: string;
    type_check: EnumOTP.FORGOT | EnumOTP.REGISTER;
  };
  KYC: {
    phoneNumber: string;
    password: string;
    userId: string;
  };
  Categoires: {
    searchText: string;
  };
  RestaurantDetail: {
    restaurantId: string;
    distance: number;
  };
  ExtraFood: {
    foodId: string;
    index: number;
  };
  ResetPassword: {
    phoneNumber: string;
    typeCheck: EnumOTP.FORGOT | EnumOTP.REGISTER;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    StackScreenProps<RootStackParamList>
  >;

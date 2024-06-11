import { PERMISSIONS } from 'react-native-permissions';

export const KEY_CONTEXT = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  LANGUAGE: 'language',
  THEME_MODE: 'themeMode',
  USER: 'user',
  CHECKINTRO: 'CHECKINTRO',
};
export const RESTAURANT_KEY = {
  NEW_INSTALL: 'NEW',
  STATUS_USER: 'status',
};
export const FOOD_SOLD_STOP = 'STOP%26SOLD_OUT';

export const ANDROID_PERMISSIONS_LOCATION = [
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
];

export const PAGING = {
  PAGE: 1,
  LIMIT: 10,
  DISTANCE: 100000,
};

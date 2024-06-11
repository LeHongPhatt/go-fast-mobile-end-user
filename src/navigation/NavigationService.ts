import { createRef } from 'react';
import {
  StackActions,
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export const NavigationService = {
  navigationRef,
  goBack: () => navigationRef.current?.goBack(),
  route: () => navigationRef.current?.getCurrentRoute(),
  push: (name: string, params?: any) =>
    navigationRef.current?.dispatch(StackActions.push(name, params)),
  navigate: (name: string, params?: any) =>
    navigationRef.current?.navigate(name, params),
  replace: (name: string, params?: any) =>
    navigationRef.current?.dispatch(StackActions.replace(name, params)),
  reset: (name: string, params?: any) =>
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params,
          },
        ],
      }),
    ),
  resetTo: (routes: Array<{ name: string; params?: any }>, index = 0) =>
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    ),
};

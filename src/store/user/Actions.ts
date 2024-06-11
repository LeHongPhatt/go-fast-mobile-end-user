/** @format */

import { Routes } from 'navigation';
import { IHomeActionPayload } from 'types';
// import {ROUTES} from 'utils';

export const UserActions = {
  GET_BASE_ACTIONS: 'GET_BASE_ACTIONS_USER',
  POST_BASE_ACTIONS: 'POST_BASE_ACTIONS_USER',
  LOGOUT: 'LOGOUT',
  FORCE_LOGIN: 'FORCE_LOGIN',
};

export const getBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: UserActions.GET_BASE_ACTIONS,
  callback,
});

export const postBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: payload?.type || UserActions.POST_BASE_ACTIONS,
  callback,
});

export const logoutRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => {
  return {
    payload,
    type: UserActions.LOGOUT,
    callback,
  };
};

export const forceLoginRequest = (previousPath: Routes) => {
  return {
    previousPath,
    type: UserActions.FORCE_LOGIN,
  };
};

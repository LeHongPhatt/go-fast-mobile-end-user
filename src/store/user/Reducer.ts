/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { ELanguage, IAppState } from 'types';
import { EnumStatusRestaurant } from 'utils';

const initialState = {
  loading: false,
  error: null,
  language: ELanguage.VI,
  isAuth: false,
  user: null,
  status: EnumStatusRestaurant.CLOSED,
  userInfo: {},
  isShowIntro: false,
} as IAppState;

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionRequest: state => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    actionRequestDone: state => {
      return {
        ...state,
        loading: false,
      };
    },
    getDataSuccess: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        error: null,
        loading: false,
        ...payload,
      };
    },
    changeRestStatus: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        error: null,
        loading: false,
        status: payload,
      };
    },
    reset: () => {
      return {
        ...initialState,
        isShowIntro: true,
      };
    },
    isShowIntro: state => {
      return {
        ...state,
        isShowIntro: true,
      };
    },
    updateProfile: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
});

export const {
  actionRequest,
  actionRequestDone,
  getDataSuccess,
  reset,
  changeRestStatus,
  isShowIntro,
  updateProfile,
} = userSlice.actions;

export default userSlice.reducer;

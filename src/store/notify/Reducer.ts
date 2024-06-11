/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { INofifyState } from 'types';
const initialState: INofifyState = {
  message: '',
  type: 'info',
  options: {
    position: {
      horizontal: 'center',
      vertical: 'top',
    },
    autoHideDuration: 6000,
    useI18n: false,
  },
};
const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    show: (state, { payload }: { payload: INofifyState }) => {
      return {
        ...state,
        message: payload.message,
        type: payload.type || 'info',
        options: {
          ...state.options,
          useI18n: !!payload?.options?.useI18n,
        },
      };
    },
    info: (state, { payload }: { payload: INofifyState }) => {
      return {
        ...state,
        message: payload.message,
        type: 'info',
        options: {
          ...state.options,
          useI18n: !!payload?.options?.useI18n,
        },
      };
    },
    success: (state, { payload }: { payload: INofifyState }) => {
      return {
        ...state,
        message: payload.message,
        type: 'success',
        options: {
          ...state.options,
          useI18n: !!payload?.options?.useI18n,
        },
      };
    },
    warning: (state, { payload }: { payload: INofifyState }) => {
      return {
        ...state,
        message: payload.message,
        type: 'warning',
        options: {
          ...state.options,
          useI18n: !!payload?.options?.useI18n,
        },
      };
    },
    error: (state, { payload }: { payload: INofifyState }) => {
      return {
        ...state,
        message: payload.message,
        type: 'error',
        options: {
          ...state.options,
          useI18n: !!payload?.options?.useI18n,
        },
      };
    },
    hide: state => {
      return {
        ...state,
        message: '',
      };
    },
  },
});

export const { hide, error, info, warning, success, show } =
  notifySlice.actions;

export default notifySlice.reducer;

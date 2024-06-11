import { createSlice } from '@reduxjs/toolkit';
import { IHomeState } from 'types';

const initialState: IHomeState = {
  loading: false,
  listCategories: [],
  listPromotions: [],
  listSuggests: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    actionRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    getDataSuccess: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        loading: false,
        ...payload,
      };
    },
  },
});
export const { actionRequest, getDataSuccess } = homeSlice.actions;
export default homeSlice.reducer;

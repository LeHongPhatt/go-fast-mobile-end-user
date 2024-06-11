import { createSlice } from '@reduxjs/toolkit';
import { IOrdersState } from 'types';

const initialState: IOrdersState = {
  loading: false,
  orderCodes: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    actionRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    getDataDone: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        loading: false,
        ...payload,
      };
    },
    addOrderCode: (state, { payload }: { payload: string }) => {
      state.orderCodes.push(payload);
      return state;
    },
  },
});
export const { actionRequest, getDataDone, addOrderCode } = ordersSlice.actions;
export default ordersSlice.reducer;

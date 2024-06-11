/**
 * @format
 * @description get data from redux store when perform the user authentication
 */

import { createSelector } from 'reselect';
import { IOrdersState } from 'types';

const selector = (state: { orders: IOrdersState }) => state.orders;

export const getLoading = createSelector(
  selector,
  ({ loading }: IOrdersState) => loading,
);

export const getAttrByKey = (k: keyof IOrdersState) =>
  createSelector(selector, app => app[k]);

/**
 * @format
 * @description get data from redux store when perform the user authentication
 */

import { createSelector } from 'reselect';
import { IHomeState } from 'types';

const selector = (state: { home: IHomeState }) => state.home;

export const getLoading = createSelector(
  selector,
  ({ loading }: IHomeState) => loading,
);

export const getListSuggest = createSelector(
  selector,
  ({ listSuggests }: IHomeState) => listSuggests,
);

export const getAttrByKey = (k: keyof IHomeState) =>
  createSelector(selector, app => app[k]);

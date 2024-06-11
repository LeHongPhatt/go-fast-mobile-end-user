/**
 * @format
 * @description get data from redux store when perform the user authentication
 */

import { createSelector } from 'reselect';
import { IAppState } from 'types';

const selector = (state: { user: IAppState }) => state.user;

export const getError = createSelector(
  selector,
  ({ error }: IAppState) => error,
);

export const getLoading = createSelector(
  selector,
  ({ loading }: IAppState) => loading,
);

export const getPreviousPath = createSelector(
  selector,
  ({ previousPath }: IAppState) => previousPath,
);

// export const getAuthUser = createSelector(selector, app => app?.user);

export const getAttrByKey = (k: keyof IAppState) =>
  createSelector(selector, app => app[k]);

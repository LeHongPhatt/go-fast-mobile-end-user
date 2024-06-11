/**
 * @format
 * @description get data from redux store when perform the user authentication
 */

import { createSelector } from 'reselect';
import { ICategoriesState } from 'types';

const selector = (state: { categories: ICategoriesState }) => state.categories;

export const getLoading = createSelector(
  selector,
  ({ loading }: ICategoriesState) => loading,
);

export const getAttrByKey = (k: keyof ICategoriesState) =>
  createSelector(selector, app => app[k]);

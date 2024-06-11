import { IHomeActionPayload } from 'types';

export const CategoriesActions = {
  GET_LIST_RESTAURANT: 'GET_LIST_RESTAURANT',
  GET_DETAIL_RESTAURANT: 'GET_DETAIL_RESTAURANT',
  GET_LIST_FOOD: 'GET_LIST_FOOD',
  GET_LIST_CATALOG_FOOD: 'GET_LIST_CATALOG_FOOD',
};

export const getBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: payload?.type || CategoriesActions.GET_LIST_RESTAURANT,
  callback,
});

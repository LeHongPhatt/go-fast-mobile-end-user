import { IHomeActionPayload } from 'types';

export const HomeActions = {
  GET_LIST_CATEGORY: 'GET_LIST_CATEGORY',
  GET_LIST_PROMOTION: 'GET_LIST_PROMOTION',
  GET_LIST_SUGGESTION: 'GET_LIST_SUGGESTION',
};

export const getBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: payload?.type || HomeActions.GET_LIST_CATEGORY,
  callback,
});

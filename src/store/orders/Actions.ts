import { IHomeActionPayload } from 'types';

export const OrdersActions = {
  /** Default get request action */
  GET_BASE_ACTIONS: 'GET_BASE_ACTIONS_ORDER',
  /** Default post request action */
  POST_BASE_ACTIONS: 'POST_BASE_ACTIONS_ORDER',
};

export const getBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: OrdersActions.GET_BASE_ACTIONS,
  callback,
});

export const postBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: OrdersActions.POST_BASE_ACTIONS,
  callback,
});

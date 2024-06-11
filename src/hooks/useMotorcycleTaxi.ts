import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersSelectors } from 'store/orders';
import * as OrdersActions from 'store/orders';
import { ICallback, IOrderRequest } from 'types';
import { API_ENDPOINT } from 'utils';
import { useLocation } from './useLocation';
export const useMotorcycleTaxi = () => {
  const dispatch = useDispatch();
  const { locationUser } = useLocation();
  const loading = useSelector(OrdersSelectors.getLoading);

  const createOrder = useCallback(
    (data: IOrderRequest, cb?: ICallback) => {
      dispatch(
        OrdersActions.postBaseActionsRequest(
          {
            endPoint: API_ENDPOINT.MOTORCYCLE_TAXI.CREATE,
            formData: {
              ...data,
              customer: {
                ...data.customer,
                // TODO: uncomment on real PR
                // ...locationUser,
                // TODO: remove on real PR
                long: 106.64354939796388,
                lat: 10.864089278331392,
              },
            },
          },
          cb,
        ),
      );
    },
    [dispatch, locationUser],
  );

  return {
    loading,
    createOrder,
  };
};

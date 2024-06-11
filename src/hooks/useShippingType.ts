import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as OrdersActions from 'store/orders';
import { IResponse, IShippingType } from 'types';
import { API_ENDPOINT } from 'utils';

export const useShippingType = () => {
  const dispatch = useDispatch();
  const [listData, setListData] = useState<IShippingType[]>([]);

  const reloadListData = useCallback(() => {
    dispatch(
      OrdersActions.getBaseActionsRequest(
        {
          endPoint: API_ENDPOINT.SHIPPING_TYPES.GET_ALL,
        },
        (rs: IResponse) => {
          if (Array.isArray(rs?.data?.result) && rs?.data?.result[0]) {
            setListData(rs.data.result[0]);
          }
        },
      ),
    );
  }, [dispatch]);

  useEffect(() => {
    reloadListData();
  }, []);

  return {
    listData,
  };
};

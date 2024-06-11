import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersSelectors } from 'store/orders';
import * as OrdersActions from 'store/orders';
import {
  IBookTaxiRequest,
  ICallback,
  IListOrderItem,
  IOrderRequest,
  IResponse,
  OrderStatus,
} from 'types';
import { API_ENDPOINT, PAGING } from 'utils';
import { useLocation } from './useLocation';
export const useOrders = () => {
  const dispatch = useDispatch();
  const { locationUser } = useLocation();
  const loading = useSelector(OrdersSelectors.getLoading);

  const createOrder = useCallback(
    (data: IOrderRequest, cb?: ICallback) => {
      dispatch(
        OrdersActions.postBaseActionsRequest(
          {
            endPoint: API_ENDPOINT.ORDER.CREATE,
            formData: data,
          },
          cb,
        ),
      );
    },
    [dispatch, locationUser],
  );

  const getOrderDetailByCode = useCallback(
    (orderCode: string, cb?: ICallback) => {
      dispatch(
        OrdersActions.getBaseActionsRequest(
          {
            endPoint: API_ENDPOINT.ORDER.DETAIL,
            params: {
              orderCode,
            },
          },
          cb,
        ),
      );
    },
    [dispatch, locationUser],
  );

  const getFoodDetailByCode = useCallback(
    (foodCode: string, cb?: ICallback) => {
      dispatch(
        OrdersActions.getBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.ORDER.GET_FOOD_DETAIL}/${foodCode}`,
          },
          cb,
        ),
      );
    },
    [dispatch, locationUser],
  );

  const onCancelOrderByCode = useCallback(
    (orderCode: string, cb?: ICallback) => {
      dispatch(
        OrdersActions.postBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.ORDER.CANCEL}/${orderCode}/cancel`,
          },
          cb,
        ),
      );
    },
    [dispatch],
  );

  const keepFindDriverForOrderByCode = useCallback(
    (orderCode: string, cb?: ICallback) => {
      dispatch(
        OrdersActions.postBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.ORDER.KEEP_FIND_DRIVER}/${orderCode}/find-driver`,
          },
          cb,
        ),
      );
    },
    [dispatch],
  );

  const getInfoTaxiService = useCallback(
    (data: IBookTaxiRequest, cb?: ICallback) => {
      dispatch(
        OrdersActions.postBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.MOTORCYCLE_TAXI.PRE_CREATE}`,
            formData: data,
          },
          cb,
        ),
      );
    },
    [dispatch],
  );

  const findCarAction = useCallback(
    (data: IBookTaxiRequest, cb?: ICallback) => {
      dispatch(
        OrdersActions.postBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.MOTORCYCLE_TAXI.CREATE}`,
            formData: data,
          },
          cb,
        ),
      );
    },
    [dispatch],
  );

  const cancleFindDriver = useCallback(
    (data: any, cb?: ICallback) => {
      dispatch(
        OrdersActions.postBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.MOTORCYCLE_TAXI.CANCEL}/${data.id}/cancelled`,
          },
          cb,
        ),
      );
    },
    [dispatch],
  );

  return {
    loading,
    createOrder,
    getOrderDetailByCode,
    onCancelOrderByCode,
    getFoodDetailByCode,
    keepFindDriverForOrderByCode,
    getInfoTaxiService,
    findCarAction,
    cancleFindDriver,
  };
};

export const useListOrder = ({
  limit = PAGING.LIMIT,
  customerCatalogId,
  status,
}: {
  limit?: number;
  customerCatalogId: string;
  status: OrderStatus[];
}) => {
  const dispatch = useDispatch();
  const [listData, setListData] = useState<IListOrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  const haveMore = useRef(true);

  const getList = useCallback(
    (data, cb?: ICallback) => {
      dispatch(
        OrdersActions.getBaseActionsRequest(
          {
            endPoint: API_ENDPOINT.ORDER.GET_ORDER_LIST,
            params: data,
          },
          cb,
        ),
      );
    },
    [dispatch],
  );

  const fetchData = useCallback(() => {
    if (haveMore.current && !isLoading) {
      setIsLoading(true);
      getList(
        {
          page: page.current,
          limit,
          status,
          customerCatalogId,
        },
        handleFetchDataSuccess,
      );
    }
  }, [isLoading, customerCatalogId, page, limit, status]);

  const refreshData = useCallback(() => {
    setListData([]);
    page.current = 1;
    haveMore.current = true;
  }, []);

  const handleFetchDataSuccess = (result: IResponse) => {
    switch (result.status) {
      case 200:
        if (result.data) {
          if (Array.isArray(result.data.result)) {
            page.current += 1;
            setListData(state => [...state, ...result.data.result]);
            if (
              result.data.result.length === 0 ||
              result.data.result.length < limit
            ) {
              haveMore.current = false;
            }
          } else {
            haveMore.current = false;
          }
        }
        break;

      default:
        haveMore.current = false;
        break;
    }
    setIsLoading(false);
  };

  return {
    listData,
    fetchData,
    refreshData,
    isLoading,
  };
};

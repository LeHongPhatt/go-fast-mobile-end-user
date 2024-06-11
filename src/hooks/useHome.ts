import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as HomeActions from 'store/home';
import { HomeSelectors } from 'store/home';
import {
  ICategory,
  IHomeActionPayload,
  IPromotion,
  ISuggestRestaurant,
} from 'types';

import { API_ENDPOINT } from 'utils';
import { useLocation } from './useLocation';
export const useHome = () => {
  const dispatch = useDispatch();
  const { locationUser } = useLocation();
  const loading = useSelector(HomeSelectors.getLoading);
  const listCategories = useSelector(
    HomeSelectors.getAttrByKey('listCategories'),
  ) as ICategory[];
  const listPromotions = useSelector(
    HomeSelectors.getAttrByKey('listPromotions'),
  ) as IPromotion[];
  const listSuggests: null | { result: ISuggestRestaurant[] } = useSelector(
    HomeSelectors.getAttrByKey('listSuggests'),
  ) as any;
  const getListCategories = useCallback(() => {
    dispatch(
      HomeActions.getBaseActionsRequest({
        dataKey: 'listCategories',
        endPoint: API_ENDPOINT.HOME.CATELOG,
      }),
    );
  }, [dispatch]);
  const getListPromotions = useCallback(
    (restaurantId?: string) => {
      dispatch(
        HomeActions.getBaseActionsRequest({
          dataKey: 'listPromotions',
          endPoint: API_ENDPOINT.HOME.PROMOTION,
          params: {
            restaurantId,
          },
        }),
      );
    },
    [dispatch],
  );
  const reloadSuggestHome = useCallback(
    (limit = 4) => {
      dispatch(
        HomeActions.getBaseActionsRequest({
          dataKey: 'listSuggests',
          endPoint: API_ENDPOINT.HOME.SUGGEST_RESTAURANTS,
          isPaginate: true,
          params: {
            page: 1,
            limit,
            ...locationUser,
          },
        }),
      );
    },
    [locationUser, dispatch],
  );
  const getListSuggests = useCallback(
    (page = 1, limit = 10, cb?: IHomeActionPayload['callback']) => {
      dispatch(
        HomeActions.getBaseActionsRequest(
          {
            endPoint: API_ENDPOINT.HOME.SUGGEST_RESTAURANTS,
            isPaginate: true,
            params: {
              page,
              limit,
              ...locationUser,
            },
          },
          cb,
        ),
      );
    },
    [locationUser, dispatch],
  );

  return {
    loading,
    listCategories,
    listPromotions,
    listSuggests:
      listSuggests && listSuggests.result ? listSuggests.result : [],
    reloadSuggestHome,
    getListCategories,
    getListPromotions,
    getListSuggests,
  };
};

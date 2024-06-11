import { useCallback, useRef, useState } from 'react';
import { IPage, IResponse, IRestaurantDetail } from 'types';
import { useCategories } from './useCategories';
import { PAGING } from 'utils';

export const useListRestaurant = () => {
  const { getListRestaurants } = useCategories();
  const [listData, setListData] = useState<IRestaurantDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  const haveMore = useRef(true);

  const fetchListRestaurant = useCallback(
    (newSearch?: string) => {
      if (haveMore.current && !isLoading) {
        setIsLoading(true);
        getListRestaurants(
          {
            page: page.current,
            limit: PAGING.LIMIT,
            search: newSearch,
          } as IPage,
          handleFetchDataSuccess,
        );
      }
    },
    [isLoading],
  );

  const fetchData = useCallback(
    (newSearch?: string) => {
      if (haveMore.current && !isLoading) {
        fetchListRestaurant(newSearch);
      }
    },
    [fetchListRestaurant, isLoading],
  );

  const refreshData = useCallback(
    (newSearch?: string) => {
      if (!isLoading) {
        setListData([]);
        page.current = 1;
        haveMore.current = true;
        fetchListRestaurant(newSearch);
      }
    },
    [fetchListRestaurant, isLoading],
  );

  const handleFetchDataSuccess = (result: IResponse) => {
    switch (result.status) {
      case 200:
        if (result.data) {
          if (Array.isArray(result.data.result)) {
            page.current += 1;
            setListData(state => [...state, ...result.data.result]);
            if (
              result.data.result.length === 0 ||
              result.data.result.length < PAGING.LIMIT
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

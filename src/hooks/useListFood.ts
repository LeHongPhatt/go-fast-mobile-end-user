import { useCallback, useRef, useState } from 'react';
import { IFood, IListFoodParams, IResponse } from 'types';
import { useCategories } from './useCategories';
import { PAGING } from 'utils';

export const useListFood = () => {
  const { getListFoods } = useCategories();
  const [listFoodData, setListFoodData] = useState<IFood[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  const haveMore = useRef(true);

  // list food
  const fetchListFood = useCallback(
    (restaurantId?: string, foodId?: string) => {
      setIsLoading(true);
      getListFoods(
        {
          page: page.current,
          limit: PAGING.LIMIT,
          foodCatalogId: foodId ?? '',
          restaurantId: restaurantId,
        } as IListFoodParams,
        handleFetchFoodDataSuccess,
      );
    },
    [getListFoods],
  );

  const fetchFoodData = useCallback(
    (restaurantId?: string, foodId?: string) => {
      if (haveMore.current && !isLoading) {
        fetchListFood(restaurantId, foodId);
      }
    },
    [fetchListFood, isLoading],
  );

  const refreshFoodData = useCallback(
    (restaurantId?: string, foodId?: string) => {
      if (!isLoading) {
        setListFoodData([]);
        page.current = 1;
        haveMore.current = true;
        fetchListFood(restaurantId, foodId);
      }
    },
    [fetchListFood, isLoading],
  );

  const handleFetchFoodDataSuccess = (result: IResponse) => {
    setIsLoading(false);
    switch (result.status) {
      case 200:
        if (result.data) {
          if (Array.isArray(result.data.result)) {
            page.current += 1;
            setListFoodData(state => [...state, ...result.data.result]);
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
  };

  return {
    listFoodData,
    fetchFoodData,
    refreshFoodData,
    isLoading,
  };
};

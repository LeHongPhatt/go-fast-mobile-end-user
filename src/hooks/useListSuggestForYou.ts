import { useCallback, useRef, useState } from 'react';
import { useHome } from './useHome';
import { IResponse, ISuggestRestaurant } from 'types';

export const useListSuggestForYou = (limit = 10) => {
  const { getListSuggests } = useHome();
  const [listData, setListData] = useState<ISuggestRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  const haveMore = useRef(true);
  const fetchData = useCallback(() => {
    if (haveMore.current && !isLoading) {
      setIsLoading(true);
      getListSuggests(page.current, limit, handleFetchDataSuccess);
    }
  }, [isLoading]);

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

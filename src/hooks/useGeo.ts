import axios, { CancelTokenSource } from 'axios';
import { useCallback, useRef } from 'react';
import { GOONG_URI, RSAPI_KEY } from '@env';
import { API_ENDPOINT } from 'utils';

export const useGeo = () => {
  const onNameByLatLng = useCallback(
    ({ latitude, longitude }, callback?: (a: any) => void) => {
      axios
        .get(`${GOONG_URI}/${API_ENDPOINT.GOONG.GEO_CODE}`, {
          params: {
            api_key: RSAPI_KEY,
            latlng: `${latitude},${longitude}`,
          },
        })
        .then(res => {
          callback?.(res?.data?.results?.[0]?.formatted_address);
        })
        .catch(err => console.log('ERROR---', err));
    },
    [],
  );

  const searchDetail = useCallback(
    ({ place_id, options = {} }, callback?: (a: any) => void) => {
      axios
        .get(`${GOONG_URI}/${API_ENDPOINT.GOONG.PLACE_DETAIL}`, {
          params: { place_id, api_key: RSAPI_KEY, ...options },
        })
        .then(({ data }) => {
          callback?.(data);
        });
    },
    [],
  );

  const searchAutoComplete = useCallback(
    ({ input, options }, callback?: (a: any) => void) => {
      axios
        .get(`${GOONG_URI}/${API_ENDPOINT.GOONG.PLACE_AUTO}`, {
          params: { input, api_key: RSAPI_KEY, radius: 10, ...options },
        })
        .then(({ data }) => {
          callback?.(data.predictions);
        });
    },
    [],
  );

  let cancelToken = useRef<CancelTokenSource | null>(null);

  const searchDirection = useCallback(
    (
      data: {
        origin: string;
        destination: string;
        alternatives?: boolean;
        vehicle?: 'car' | 'bike' | 'taxi' | 'truck';
      },
      callback?: (a: any) => void,
    ) => {
      if (cancelToken.current) {
        // If there is a previous request, cancel it
        cancelToken.current.cancel('New request made');
      }

      cancelToken.current = axios.CancelToken.source();

      axios
        .get(`${GOONG_URI}/${API_ENDPOINT.GOONG.DIRECTION}`, {
          params: { ...data, api_key: RSAPI_KEY },
          cancelToken: cancelToken.current.token, // Pass the cancel token to the request
        })
        .then(res => {
          callback?.(res);
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            // Request was canceled
            console.log('Request canceled:', error.message);
          } else {
            // Handle other errors
            console.log('Error:', error.message);
          }
        });
    },
    [],
  );

  const searchDistanceMatrix = useCallback(
    (
      {
        vehicle = 'bike',
        ...data
      }: {
        origin: string;
        destination: string;
        alternatives?: boolean;
        vehicle?: 'car' | 'bike' | 'taxi' | 'truck';
      },
      callback?: (a: any) => void,
    ) => {
      axios
        .get(`${GOONG_URI}/${API_ENDPOINT.GOONG.DISTANCE_MATRIX}`, {
          params: { ...data, vehicle, api_key: RSAPI_KEY },
        })
        .then(res => {
          callback?.(res);
        })
        .catch(error => {});
    },
    [],
  );

  return {
    onNameByLatLng,
    searchDetail,
    searchAutoComplete,
    searchDirection,
    searchDistanceMatrix,
  };
};

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as LocationActions from 'store/location';
import { ILongLocation } from 'types';
export const useLocation = () => {
  const dispatch = useDispatch();
  const locationUser = useSelector(
    LocationActions.LocationSelectors.location,
  ) as ILongLocation;
  const saveCurrentLocation = useCallback((location: ILongLocation) => {
    dispatch(LocationActions.getLocation({ location }));
  }, []);
  return {
    locationUser,
    saveCurrentLocation,
  };
};

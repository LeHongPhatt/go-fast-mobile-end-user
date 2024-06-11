import { createSelector } from '@reduxjs/toolkit';
import { ILocationState } from 'types';

const selector = (state: { location: ILocationState }) => state.location;

export const location = createSelector(
  selector,
  (local: ILocationState) => local.location,
);

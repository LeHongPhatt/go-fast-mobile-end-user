/**
 * @description get data from redux store when perform the user authentication
 */
import { createSelector } from 'reselect';
import { INofifyState } from 'types';

const selector = (state: { notify: INofifyState }) => state.notify;

export const getMessage = createSelector(
  selector,
  ({ message }: INofifyState) => message,
);

export const getType = createSelector(
  selector,
  ({ type }: INofifyState) => type,
);

export const getPosition = createSelector(
  selector,
  ({ options }: INofifyState) => options.position,
);

export const getDuration = createSelector(
  selector,
  ({ options }: INofifyState) => options.autoHideDuration,
);

export const getTranslations = createSelector(
  selector,
  ({ options }: INofifyState) => options.useI18n,
);

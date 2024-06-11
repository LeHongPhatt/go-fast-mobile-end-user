import { all } from 'redux-saga/effects';
import userSagas from './user/Sagas';
import homeSagas from './home/Sagas';
import categoriesSagas from './categories/Sagas';
import ordersSagas from './orders/Sagas';

export default function* rootSaga() {
  yield all([userSagas(), homeSagas(), categoriesSagas(), ordersSagas()]);
}

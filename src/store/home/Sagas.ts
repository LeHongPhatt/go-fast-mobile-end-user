import { all, put, takeEvery } from 'redux-saga/effects';
import { actionRequest, getDataSuccess } from './Reducer';
import { IHomeActionPayload, INofifyState } from 'types';
import { HomeActions } from './Actions';
import { axiosClient } from 'utils';
import { error } from 'store/notify';

function* onGetBaseActionsRequested(action: IHomeActionPayload) {
  try {
    // console.log('onGetBaseActionsRequested', action);
    yield put(actionRequest());
    const rs = yield axiosClient.get(`${action.payload.endPoint}`, {
      params: action.payload.params,
    });
    // console.log('onGetBaseActionsRequested', rs);
    if (rs.status === 200) {
      const dataKey = action?.payload?.dataKey;
      const data = action?.payload?.isPaginate
        ? rs?.data
        : action?.payload?.isObject
        ? rs?.data?.result[0]
        : rs?.data?.result;
      const payload = dataKey ? { [`${dataKey}`]: data } : {};

      yield put(getDataSuccess(payload));
      if (action?.callback) {
        action?.callback?.(rs);
      }
    }
  } catch (e: any) {
    yield put(
      error({
        message: 'some_thing_wrong',
        options: { useI18n: true },
      } as INofifyState),
    );
    yield put(getDataSuccess({}));
    return action?.callback?.({ ...e });
  }
}
function* watchGetBaseActions() {
  yield takeEvery(
    HomeActions.GET_LIST_CATEGORY as any,
    onGetBaseActionsRequested,
  );
}
export default function* homeSagas() {
  yield all([watchGetBaseActions()]);
}

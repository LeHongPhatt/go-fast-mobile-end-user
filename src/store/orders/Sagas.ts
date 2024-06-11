import { all, put, takeEvery } from 'redux-saga/effects';
import { actionRequest, getDataDone } from './Reducer';
import { IHomeActionPayload, INofifyState } from 'types';
import { OrdersActions } from './Actions';
import { axiosClient } from 'utils';
import { error } from 'store/notify';

//#region Get Base action
function* onGetBaseActionsRequested(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    const rs = yield axiosClient.get(`${action.payload.endPoint}`, {
      params: action.payload.params,
    });
    let payload = {};

    if (rs.status === 200) {
      const dataKey = action?.payload?.dataKey;
      const data = action?.payload?.isPaginate
        ? rs?.data
        : action?.payload?.isObject
        ? rs?.data?.result[0]
        : rs?.data?.result;

      payload = dataKey
        ? {
            [`${dataKey}`]: data,
          }
        : payload;
    }

    yield put(getDataDone(payload));
    if (action?.callback) {
      action?.callback?.(rs);
    }
  } catch (e: any) {
    yield put(
      error({
        message: 'some_thing_wrong',
        options: { useI18n: true },
      } as INofifyState),
    );
    yield put(getDataDone({}));
    return action?.callback?.({ ...e });
  }
}
function* watchGetBaseActions() {
  yield takeEvery(
    OrdersActions.GET_BASE_ACTIONS as any,
    onGetBaseActionsRequested,
  );
}
//#endregion

//#region Post Base action
function* onPostBaseActionsRequested(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    const rs = yield axiosClient.post(
      `${action.payload.endPoint}`,
      action?.payload?.formData,
      {
        headers: { ...action.payload?.headers },
      },
    );

    const dataKey = action?.payload?.dataKey;
    const payload = dataKey
      ? {
          [`${dataKey}`]: action?.payload?.isObject
            ? rs?.data?.result?.[0]
            : rs?.data?.result,
        }
      : {};

    yield put(getDataDone(payload));
    if (action?.callback) {
      action?.callback?.(rs);
    }
  } catch (e: any) {
    yield put(
      error({
        message: 'some_thing_wrong',
        options: { useI18n: true },
      } as INofifyState),
    );
    yield put(getDataDone({}));
    return action?.callback?.({ ...e });
  }
}
function* watchPostBaseActions() {
  yield takeEvery(
    OrdersActions.POST_BASE_ACTIONS as any,
    onPostBaseActionsRequested,
  );
}
//#endregion

export default function* ordersSagas() {
  yield all([watchGetBaseActions(), watchPostBaseActions()]);
}

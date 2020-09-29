import { takeEvery, all, takeLatest } from "redux-saga/effects";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngridientsSaga } from "./pernilBuilder";
import { purchasePernilSaga, fetchOrdersSaga } from "./order";

import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchPernilBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngridientsSaga);
}

export function* watchOrder() {
  //To execute the latest action
  yield takeLatest(actionTypes.PURCHASE_PERNIL, purchasePernilSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}

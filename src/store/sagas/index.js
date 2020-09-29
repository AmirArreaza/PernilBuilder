import { takeEvery } from "redux-saga/effects";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngridientsSaga } from "./pernilBuilder";
import { purchasePernilSaga, fetchOrdersSaga } from './order'

import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchPernilBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngridientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_PERNIL, purchasePernilSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}

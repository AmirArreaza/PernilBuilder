import * as actions from "../actions/index";
import axios from "../../axios-orders";
import { put } from "redux-saga/effects";

export function* purchasePernilSaga(action) {
  yield put(actions.purchasePernilStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchasePernilSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchasePernilFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrderStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    console.log(queryParams);
    const response = yield axios.get("orders.json" + queryParams);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({ ...response.data[key], id: key });
    }
    yield put(actions.fetchOrderSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrderFailed(error));
  }
}

import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchasePernilSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {
    id: action.orderId,
  });
  return updateObject(state, {
    ...state,
    loading: false,
    orders: newOrder,
    purchased: true,
  });
};
const purchasePernilFail = (state, action) =>
  updateObject(state, { loading: false });
const purchasePernilStart = (state, action) =>
  updateObject(state, { loading: true });
const purchaseInit = (state, action) => {
  return updateObject(state, {
    ...state,
    purchased: false,
  });
};
const fetchOrdersStart = (state, action) =>
  updateObject(state, { loading: true });
const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    ...state,
    orders: action.orders,
    loading: false,
  });
};
const fetchOrdersFailed = (state, action) =>
  updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_PERNIL_SUCCESS:
      return purchasePernilSuccess(state, action);
    case actionTypes.PURCHASE_PERNIL_FAIL:
      return purchasePernilFail(state, action);
    case actionTypes.PURCHASE_PERNIL_START:
      return purchasePernilStart(state, action);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);
    default:
      return state;
  }
};

export default reducer;

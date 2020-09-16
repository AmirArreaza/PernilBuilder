import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";

export const purchasePernilSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_PERNIL_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};
export const purchasePernilFail = (error) => {
  return {
    type: actionTypes.PURCHASE_PERNIL_FAIL,
    error: error,
  };
};
export const purchasePernilStart = () => {
  return {
    type: actionTypes.PURCHASE_PERNIL_START,
  };
};
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
export const purchasePernil = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchasePernilStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        console.log(response);
        dispatch(purchasePernilSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(purchasePernilFail(error));
      });
  };
};
export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};
export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  };
};
export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};
export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get("orders.json?auth=" + token)
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrderFailed(err));
      });
  };
};

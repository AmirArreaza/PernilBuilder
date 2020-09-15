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

export const purchasePernil = (orderData) => {
  return (dispatch) => {
    dispatch(purchasePernilStart());
    axios.post("/orders.json", orderData).then(
      (response) => {
        console.log(response.data);
        dispatch(purchasePernilSuccess(response.data.name, orderData));
      },
      (error) => {
        dispatch(purchasePernilFail(error));
      }
    );
  };
};



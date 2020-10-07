import React, { useState, useEffect, useCallback } from "react";
import axios from "../../axios-orders";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Pernil from "../../components/Pernil/Pernil";
import BuildControls from "../../components/Pernil/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Pernil/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const PernilBuilder = (props) => {
  const [purchaising, setPurchaising] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector((state) => state.pernilBuilder.ingredients);
  const price = useSelector((state) => state.pernilBuilder.totalPrice);
  const error = useSelector((state) => state.pernilBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const onIngredientAdded = (ingName) =>
    dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) =>
    dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchased = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchaising(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchaising(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchased();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let pernil = error ? <p>Can't load ingreadients</p> : <Spinner />;

  if (ings) {
    pernil = (
      <Auxiliary>
        <Pernil ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchaseable={updatePurchaseState(ings)}
          price={price}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </Auxiliary>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Auxiliary>
      <Modal show={purchaising} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {pernil}
    </Auxiliary>
  );
};

export default withErrorHandler(PernilBuilder, axios);

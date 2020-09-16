import React, { Component } from "react";
import axios from "../../axios-orders";

import { connect } from "react-redux";
import * as pernilBuilderActions from "../../store/actions/index";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Pernil from "../../components/Pernil/Pernil";
import BuildControls from "../../components/Pernil/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Pernil/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class PernilBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    }else {
      this.props.history.push('/auth');
    }
    
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchased();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let pernil = this.props.error ? (
      <p>Can't load ingreadients</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      pernil = (
        <Auxiliary>
          <Pernil ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {pernil}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.pernilBuilder.ingredients,
    price: state.pernilBuilder.totalPrice,
    error: state.pernilBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(pernilBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(pernilBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(pernilBuilderActions.initIngredients()),
    onInitPurchased: () => dispatch(pernilBuilderActions.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(PernilBuilder, axios));

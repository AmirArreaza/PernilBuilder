import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Pernil from '../../components/Pernil/Pernil'
import BuildControls from '../../components/Pernil/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Pernil/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    tomatoes: 0.7
}

class PernilBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            tomatoes: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        console.log(sum);
        this.setState({ purchaseable: sum > 0});
    }

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ 
            totalPrice: newPrice, 
            ingredients: updatedIngredients 
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) return;

        const updatedCounted = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ 
            totalPrice: newPrice, 
            ingredients: updatedIngredients 
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false});
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        } 

        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Pernil ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngridientHandler}
                    ingredientRemoved={this.removeIngridientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}/>
            </Auxiliary>
        );
    };
}

export default PernilBuilder;
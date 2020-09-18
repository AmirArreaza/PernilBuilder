import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  tomatoes: 0.7,
};

const addIngredient = (state, action) => {
  const addedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const adedIngredients = updateObject(state.ingredients, addedIngredient);
  const updatedAddedState = {
    ingredients: adedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedAddedState);
}

const removeIngredient = (state, action) => {
  const addedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] -1,
  };
  const adedIngredients = updateObject(state.ingredients, addedIngredient);
  const updatedAddedState = {
    ingredients: adedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedAddedState);
}

const setIngredient = (state, action) => {
  return updateObject(state, {
    ...state,
    ingredients: {
      salad: action.ingredients.salad,
      tomatoes: action.ingredients.tomatoes,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchIngredientFailed = (state, action) => updateObject(state, { ...state, error: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFailed(state, action);
    default:
      return state;
  }
};

export default reducer;

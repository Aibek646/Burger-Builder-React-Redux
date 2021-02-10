import React, { useEffect, useState, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Aux/Aux";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });

  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  const onIngredientAdded = (ingName) =>
    dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) =>
    dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
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

  //   updatePurchaseState(ingredients) {
  //     const sum = Object.keys(ingredients)
  //       .map((igKey) => {
  //         return ingredients[igKey];
  //       })
  //       .reduce((sum, el) => {
  //         return sum + el;
  //       }, 0);
  //     setState({ purchasable: sum > 0 });
  //   }

  // addIngredientHandler = (type) => {
  //   const oldCount = state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   updatePurchaseState(updatedIngredients);
  // };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    // const queryParams = [];
    // for (let i in state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + state.totalPrice);
    // const queryString = queryParams.join("&");
    // props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients can not be loaded!</p> : <Spinner />;

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        close={purchaseCancelHandler}
        ingredients={ings}
        continue={purchaseContinueHandler}
        price={price}
      />
    );
  }

  // if (state.loading) {
  //   orderSummary = <Spinner />;
  // }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     ings: state.burgerBuilder.ingredients,
//     price: state.burgerBuilder.totalPrice,
//     error: state.burgerBuilder.error,
//     isAuthenticated: state.auth.token !== null,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//     onIngredientRemoved: (ingName) =>
//       dispatch(actions.removeIngredient(ingName)),
//     onInitIngredients: () => dispatch(actions.initIngredients()),
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//     onSetAuthRedirectPath: (path) =>
//       dispatch(actions.setAuthRedirectPath(path)),
//   };
// };

export default withErrorHandler(BurgerBuilder, axios);

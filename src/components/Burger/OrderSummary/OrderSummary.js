import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
      <p>Total Price: {props.price.toFixed(2)}</p>
      <Button clicked={props.close} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.continue} btnType="Success">
        Continue
      </Button>
    </Aux>
  );
};

export default OrderSummary;

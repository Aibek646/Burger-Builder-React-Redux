import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate() {}
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Continue to Checkout?</p>
        <p>Total Price: {this.props.price.toFixed(2)}</p>
        <Button clicked={this.props.close} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.continue} btnType="Success">
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;

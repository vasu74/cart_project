import React, { useState } from "react";
import { useRef } from "react/cjs/react.development";
import InputField from "../../UI/InputField";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    // it always return string value
    const enteredAmountNumber = +enteredAmount;
    // change into int here by adding + sign
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      amountInputRef.current.value = "1";
      return;
    }
    props.onAddToCart(enteredAmountNumber);
    amountInputRef.current.value = "1";
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <InputField
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add </button>
      {!amountIsValid && <p>enter a valid number</p>}
    </form>
  );
};

export default MealItemForm;

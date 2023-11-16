import React, { useState } from "react";
import currencyContext from "./currencyContext";

const CurrencyState = (props) => {
  const [previousValue, setPreviousValue] = useState("INR");
  const [currentValue, setCurrentValue] = useState("USD");

  const handleCurrencyChange = (selectedCurrency) => {
    setPreviousValue(currentValue); // Set the previous value before updating
    setCurrentValue(selectedCurrency); // Set the current value based on user selection
  };
  return (
    <currencyContext.Provider
      value={{ currentValue, previousValue, handleCurrencyChange }}
    >
      {props.children}
    </currencyContext.Provider>
  );
};

export default CurrencyState;
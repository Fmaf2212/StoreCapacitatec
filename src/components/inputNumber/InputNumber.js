import React, {useState} from "react";

import "./inputNumber.css";

const InputNumber = () => {
  const [value, setValue] = useState(1);
  const min = 1; // Puedes establecer el valor mínimo según tus necesidades
  const max = 100; // Puedes establecer el valor máximo según tus necesidades
  const step = 1; // Puedes establecer el paso según tus necesidades

  const handleStepper = (operation) => {
    const calcStep = operation === "increment" ? step : -step;
    const newValue = value + calcStep;

    if (newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

  return (
    <div className="inputNumber">
      <button className="decrement" onClick={() => handleStepper("decrement")}>
        {" "}
        -{" "}
      </button>
      <input
        type="number"
        id="my-input"
        value={value}
        min={min}
        max={max}
        step={step}
        readOnly
      />
      <button className="increment" onClick={() => handleStepper("increment")}>
        {" "}
        +{" "}
      </button>
    </div>
  );
};

export default InputNumber;

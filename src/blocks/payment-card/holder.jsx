import { useState } from "react";
import Input from "../../components/input/input";

const Holder = ({ onChange }) => {
  const [holder, setHolder] = useState("");

  const handleHolderChange = (event) => {
    let newValue = event.target.value.toUpperCase();
    newValue = newValue.replace(/[^A-Za-z\s]/g, "");
    setHolder(newValue);
    onChange({
      target: {
        name: "holder",
        value: newValue
      }
    });
  };

  return (
    <Input
      name="holder"
      id="holder"
      label="Введите владельца карты"
      type="text"
      required
      value={holder}
      placeholder="JOHN DOE"
      onChange={handleHolderChange}
      pattern="^[A-Z\s]*$"
    />
  );
};

export default Holder;
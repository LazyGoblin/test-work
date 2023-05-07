import { useState } from "react";
import Input from "../../components/input/input";

const Holder = ({ onChange }) => {
  const [holder, setHolder] = useState("");

  const handleHolderChange = (event) => {
    let newValue = event.target.value.toUpperCase();
    newValue = newValue.replace(/[^A-Z\s]/g, "");
    setHolder(newValue);
    onChange(event); 
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
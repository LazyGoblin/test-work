import { useState } from "react";

const Holder = ({ onChange }) => {
  const [holder, setHolder] = useState("");

  const handleHolderChange = (event) => {
    let newValue = event.target.value.toUpperCase();
    newValue = newValue.replace(/[^A-Z\s]/g, "");
    setHolder(newValue);
    onChange(newValue);
  };


  return (
    <div>
      <label htmlFor="pan">Введите владельца карты</label>
      <input
        type="text"
        id="pan"
        required
        value={holder}
        placeholder="JOHN DOE"
        onChange={handleHolderChange}
        pattern="^[A-Z\s]*$"
      />
    </div>
  );
};

export default Holder;
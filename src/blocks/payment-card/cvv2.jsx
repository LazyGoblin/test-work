    import React, { useState } from "react";
    import Input from "../../components/input/input";

    const CVV2 = ({ onChange }) => {
      const [cvv2, setCvv2] = useState("");

      const handleInputChange = (event) => {
        const valueCVS = event.target.value;
        if (/^\d*$/.test(valueCVS)) {
          setCvv2(valueCVS);
          onChange(event);
        }
      };

      return (
        <Input
          name="cvv2"
          id="cvv2"
          label="Введите CVV2/CVC2"
          type="tel"
          inputMode="numeric"
          maxLength="3"
          required
          placeholder="CVC"
          value={cvv2}
          onChange={handleInputChange}
          style={{ width: '60px' }}
        />
      );
    };

    export default CVV2;
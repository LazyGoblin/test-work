import React, { useState } from 'react';

const CVV2 = ({ onChange }) => {
  const [cvv2, setCv2] = useState('');

  const handleInputChange = (event) => {
    const valueCVS = event.target.value;
    if (/^\d*$/.test(valueCVS)) {
      setCv2(valueCVS);
      onChange(valueCVS);
    }
  };

  return (
    <div>
      <label htmlFor="cvs2">Введите CVV2/CVC2</label>
      <input
        type="tel"
        inputMode="numeric"
        id="cvs2"
        maxLength="3"
        required
        placeholder="CVC"
        value={cvv2}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CVV2;
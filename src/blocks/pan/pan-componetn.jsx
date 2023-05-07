import React, { useState } from "react";
import Input from "../../components/input/input";

const Pan = ({ onChange }) => {
    const [pan, setPan] = useState("");

    const handlePanChange = (event) => {
        const input = event.target.value;
        const digitsOnly = input.replace(/\D/g, "");
        setPan(digitsOnly.slice(0, 16));
        onChange && onChange(event);
    };

    return (
        <Input
            name="pan"
            id="pan"
            label="Номер карты"
            type="text"
            maxLength="19"
            placeholder="1234 1234 1234 1234"
            required
            value={pan.replace(/(\d{4})/g, "$1 ")}
            onChange={handlePanChange}
        />
    );
};

export default Pan;
import { useState } from "react";

const Pan = ({ onChange }) => {
    const [pan, setPan] = useState("");

    const handlePanChange = (event) => {
        const input = event.target.value;
        const digitsOnly = input.replace(/\D/g, "");
        setPan(digitsOnly.slice(0, 16));
        onChange && onChange(digitsOnly);
    };

    return (
        <div>
            <label htmlFor="pan">Номер карты</label>
            <input
                type="text"
                id="pan"
                maxLength="19"
                placeholder="1234 1234 1234 1234"
                required
                value={pan.replace(/(\d{4})/g, '$1 ')}
                onChange={handlePanChange}
            />
        </div>
    );
};

export default Pan;

import React, { useState } from "react";
import Input from "../../components/input/input";

const Expire = ({ onChange }) => {
    const [expire, setExpire] = useState("");

    const handleExpireChange = (event) => {
        let valueExpire = event.target.value;
        valueExpire = valueExpire.replace(/\D/g, "");
        valueExpire = valueExpire.replace(/^(\d\d)(\d)/g, "$1/$2");
        setExpire(valueExpire);
        onChange(event);
    };

    return (
        <Input
            name="expire"
            id="expire"
            label="Срок действия карты"
            type="text"
            pattern="\d{2}/\d{2}"
            maxLength="5"
            placeholder="MM/YY"
            required
            value={expire}
            onChange={handleExpireChange}
        />
    );
};

export default Expire;
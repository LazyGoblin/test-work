import { useState } from "react";

const Expire = ({ onChange }) => {
    const [expire, setExpire] = useState('');

    const handleExpireChange = (event) => {
        let valueExpire = event.target.value;
        valueExpire = valueExpire.replace(/\D/g, "");
        valueExpire = valueExpire.replace(/^(\d\d)(\d)/g, "$1/$2");
        setExpire(valueExpire);
        onChange(valueExpire);
    };

    return (
        <div>
            <label htmlFor="expire">Срок действия карты</label>
            <input
                type="text"
                id="expire"
                pattern="\d{2}/\d{2}"
                maxLength="5"
                placeholder="MM/YY"
                required
                value={expire}
                onChange={handleExpireChange}
            />
        </div>
    );
};

export default Expire;
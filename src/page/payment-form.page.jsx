import React, { useState, useCallback } from 'react';
import './payment-form.style.css'
import Expire from '../blocks/expire/expire-component';
import Holder from '../blocks/holder/holder-component';
import Pan from '../blocks/pan/pan-componetn';
import CVV2 from '../blocks/cvv2/cvv2-component';

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        pan: "",
        expire: "",
        holder: "",
        cvv2: ""
    });

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        const uppercaseValue = value.toUpperCase();
        setFormData(prevState => ({
            ...prevState,
            [name]: uppercaseValue
        }));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/create-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pan: formData.pan.replace(/\s/g, ''),
                expire: formData.expire,
                cvv2: formData.cvv2,
                holder: formData.holder
            })
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <section className="form">
            <form onSubmit={handleSubmit}>
                <Holder name="holder" value={formData.holder} onChange={handleInputChange} />
                <Expire name="expire" value={formData.expire} onChange={handleInputChange} />
                <CVV2 name="cvv2" value={formData.cvv2} onChange={handleInputChange} />
                <Pan name="pan" value={formData.pan} onChange={handleInputChange} />
                <div className="buttonLines">
                    <button type="submit" name="Отправить">Отправить</button>
                    <button type="button" name="Назад">Назад</button>
                </div>
            </form>
        </section>
    );
};

export default PaymentForm;

import React, { useState } from 'react';
import '../payment-form/payment-form.style.css'
import CVV2 from '../components/cvv2/cvv2-component';
import Expire from '../components/expire/expire-component';
import Holder from '../components/holder/holder-component';
import Pan from '../components/pan/pan-componetn';

const PaymentForm = () => {
    const [pan, setPan] = useState('');
    const [expire, setExpire] = useState('');
    const [holder, setHolder] = useState('');
    const [cvv2, setCVV2] = useState('');

    const handleExpireChange = (value) => {
        setExpire(value);
    };

    const handleCVV2Change = (value) => {
        setCVV2(value);
    };

    const handleHolderChange = (value) => {
        setHolder(value);
    };

    const handlePanChange = (value) => {
        setPan(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/create-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pan: pan.replace(/\s/g, ''),
                expire,
                cvv2,
                holder
            })
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <section className="form">
            <form onSubmit={handleSubmit}>
                <Holder onChange={handleHolderChange} />
                <Expire onChange={handleExpireChange} />
                <CVV2 onChange={handleCVV2Change} />
                <Pan onChange={handlePanChange} />
                <div className="buttonLines">
                    <button type="submit" name="Отправить">Отправить</button>
                    <button type="button" name="Назад">Назад</button>
                </div>
            </form>
        </section>
    );
};

export default PaymentForm;
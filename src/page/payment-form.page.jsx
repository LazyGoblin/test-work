import React, { useState, useCallback } from 'react';

import CVV2 from '../blocks/payment-card/cvv2';
import Pan from '../blocks/payment-card/pan';
import Expire from '../blocks/payment-card/expire';
import Holder from '../blocks/payment-card/holder';

import './payment-form.style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        pan: "",
        expire: "",
        holder: "",
        cvv2: ""
    });

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
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
        <div className="container">
        <section className="form">
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <p>Сумма платежа:</p>
                            </td>
                            <td>
                                <Pan name="pan" value={formData.pan} onChange={handleInputChange} />
                            </td>
                            <td>
                                <Expire name="expire" value={formData.expire} onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Holder name="holder" value={formData.holder} onChange={handleInputChange} />
                            </td>
                            <td>
                                <CVV2 name="cvv2" value={formData.cvv2} onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="btn-container">
                                <button type="submit" class="btn btn-success" name="Отправить">Отправить</button>
                                <button type="button" class="btn btn-success" name="Назад">Назад</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </section>
        </div>
    );
};

export default PaymentForm;

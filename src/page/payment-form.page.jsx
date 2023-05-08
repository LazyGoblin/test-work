import React, { useState, useCallback } from 'react';

import CVV2 from '../blocks/payment-card/cvv2';
import Pan from '../blocks/payment-card/pan';
import Expire from '../blocks/payment-card/expire';
import Holder from '../blocks/payment-card/holder';

import './payment-form.style.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
      pan: '',
      expire: '',
      holder: '',
      cvv2: ''
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
    setLoading(true);
    try {
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
      setLoading(false);
      setSuccess(true);
      console.log(data);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  };

  return (
    <section className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-header">
          <h2>Сумма платежа:</h2>
          <img src="/svg/card.svg" className="card-logo" alt="visa-mastercard" />
        </div>
        <div className="form-row">
          <div className="col">
            <Holder name="holder" value={formData.holder} onChange={handleInputChange} />
          </div>
          <div className="col">
            <Pan name="pan" value={formData.pan} onChange={handleInputChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <Expire name="expire" value={formData.expire} onChange={handleInputChange} />
          </div>
          <div className="col">
            <CVV2 name="cvv2" value={formData.cvv2} onChange={handleInputChange} />
          </div>
        </div>
        <div className="btn-container">
          <button type="button" className="btn btn-primary" name="Назад">Назад</button>
          <button type="submit" className="btn btn-success" name="Отправить">Отправить</button>
        </div>
      </form>
      {loading && (
        <dialog open>
          <p>Отправляем данные...</p>
        </dialog>
      )}

      {error && (
        <dialog open>
          <p>Ошибка!</p>
          <button type="button" className="btn btn-danger" onClick={() => setError(false)}>Закрыть</button>
        </dialog>
      )}

      {success && (
        <dialog open>
          <p>Выполнено!</p>
          <button type="button" class="btn btn-success" onClick={()=> setSuccess(false)}>Закрыть</button>
        </dialog>
      )}
    </section>
  );

};

export default PaymentForm;

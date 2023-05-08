import React, { useState, useCallback } from 'react';

import CVV2 from '../blocks/payment-card/cvv2';
import Pan from '../blocks/payment-card/pan';
import Expire from '../blocks/payment-card/expire';
import Holder from '../blocks/payment-card/holder';

import './payment-form.style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('Modal title');
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
      setModalTitle('Успех!');
      console.log(data);
    } catch (err) {
      setLoading(false);
      setError(true);
      setModalTitle('Неудача!');
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
          <button type="submit" className="btn btn-success" name="Отправить" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Отправить</button>
        </div>
      </form>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">{modalTitle}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : success ? (
                <div className="alert alert-success" role="alert">
                  Выполнено!
                  <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  Ошибка!
                  <button type="button" className="btn-close" onClick={() => setError(false)}></button>
                </div>
              ) : (
                <p>Заполните форму и отправьте данные</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentForm;

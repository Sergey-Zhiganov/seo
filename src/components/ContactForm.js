import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendingStatus, setSendingStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: name,
      email: email,
      message: message
    };

    emailjs.send('service_gp3e52f', 'template_ls0arhh', templateParams, 'Lem0TPI83qWbJpm3I')
      .then((result) => {
        console.log('Email successfully sent:', result.text);
        setSendingStatus('success');
      }, (error) => {
        console.error('Email sending failed:', error.text);
        setSendingStatus('error');
      });

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form className="feedback" onSubmit={handleSubmit}>
      {sendingStatus === 'success' && (
        <div className="alert alert-success" role="alert">
          Сообщение успешно отправлено!
        </div>
      )}
      {sendingStatus === 'error' && (
        <div className="alert alert-danger" role="alert">
          Ошибка отправки сообщения. Пожалуйста, попробуйте еще раз.
        </div>
      )}
      <div className="form-group">
        <label htmlFor="name">Имя:</label>
        <input 
          type="text" 
          id="name" 
          name="имя" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="form-control" 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="form-control" 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Сообщение:</label>
        <textarea 
          id="message" 
          name="сообщение" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          className="form-control" 
          rows="4" 
          required 
        />
      </div>
      <button type="submit" className="btn btn-primary">Отправить</button>
    </form>
  );
}

export default ContactForm;

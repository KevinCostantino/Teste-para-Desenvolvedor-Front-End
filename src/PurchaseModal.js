import React, { useState } from 'react';
import styles from './Product.module.css';

function PurchaseModal({ productId, onClose, userToken }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    streetNumber: '',
    street: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleCancel = () => {
    onClose();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api-candidate.ogruposix.com/buy/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-token': userToken,
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText} (${response.status})`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Compra realizada com sucesso:', data);
        setShowThankYouMessage(true);
        setTimeout(() => {
          setShowThankYouMessage(false);
          onClose();
        }, 5000);
      })
      .catch(error => {
        console.error('Erro ao enviar os dados:', error);
      });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <h2>Formulário de Compra</h2>
        <form id="formulario-compra" onSubmit={handleFormSubmit}>
          <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
          <input type="text" name="phone" placeholder="Telefone" value={formData.phone} onChange={handleInputChange} required />
          <input type="text" name="streetNumber" placeholder="Número da Rua" value={formData.streetNumber} onChange={handleInputChange} required />
          <input type="text" name="street" placeholder="Rua" value={formData.street} onChange={handleInputChange} required />
          <input type="text" name="neighborhood" placeholder="Bairro" value={formData.neighborhood} onChange={handleInputChange} required />
          <input type="text" name="city" placeholder="Cidade" value={formData.city} onChange={handleInputChange} required />
          <input type="text" name="state" placeholder="Estado" value={formData.state} onChange={handleInputChange} required />
          <button type="submit" className={styles.botaofinalizarcompra}>Finalizar Compra</button>
          <button type="button" onClick={handleCancel} className={styles.closeModalButton}>Fechar</button>
          </form>
        {showThankYouMessage && (
          <div className="popup">
            <div className="popup-content">
              <h2>Obrigado pela compra!</h2>
              <p>Sua compra foi realizada com sucesso.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseModal;
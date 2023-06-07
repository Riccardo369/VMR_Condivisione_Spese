import React, { useState } from 'react';
import config from './config';

// Puoi accedere alle variabili come segue:
const jwtToken = config.jwtToken;
const serverAddress = config.serverAddress;
const serverPort = config.serverPort;


const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setMessage('La nuova password e la conferma password non corrispondono.');
      return;
    }

    fetch('/api/changePassword', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('La chiamata API per modificare la password non è riuscita.');
        }

        setMessage('La password è stata modificata con successo.');
      })
      .catch(error => {
        setMessage('Si è verificato un errore durante la modifica della password.');
      });
  };

  return (
    <div className="container">
      <h1>Cambia Password</h1>
      <div className="form-group">
        <label htmlFor="current-password">Password attuale:</label>
        <input
          type="password"
          id="current-password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="new-password">Nuova password:</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Conferma nuova password:</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword}>Cambia Password</button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ChangePasswordPage;

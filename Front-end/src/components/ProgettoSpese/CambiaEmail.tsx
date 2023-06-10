import React, { FormEvent, useState } from 'react';
import config from './config';

// Puoi accedere alle variabili come segue:
const jwtToken = config.jwtToken;
const serverAddress = config.serverAddress;
const serverPort = config.serverPort;


const EmailForm: React.FC = () => {
  const [newEmail, setNewEmail] = useState('');

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Esempio di visualizzazione della nuova email
    alert("Email salvata con successo: " + newEmail);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  return (
    <div>
      <h1>Modifica Email</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Nuova Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={newEmail}
          onChange={handleEmailChange}
          required
        />
        <input type="submit" value="Salva" />
      </form>
    </div>
  );
};

export default EmailForm;

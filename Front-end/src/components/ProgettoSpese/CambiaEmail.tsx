import React, { FormEvent, useState } from 'react';

const EmailForm: React.FC = () => {
  const [newEmail, setNewEmail] = useState('');

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Esegui qui la logica per salvare l'email
    // Puoi utilizzare AJAX o inviare una richiesta a un server
    
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

import React from 'react';
import config from './config';

// Puoi accedere alle variabili come segue:
const jwtToken = config.jwtToken;
const serverAddress = config.serverAddress;
const serverPort = config.serverPort;


const WelcomePage: React.FC = () => {
  const handleLogin = () => {
    // Esempio di reindirizzamento a una pagina di accesso
    window.location.href = '/login';
  };

  const handleRegistration = () => {
    // Esempio di reindirizzamento a una pagina di registrazione
    window.location.href = '/register';
  };

  return (
    <div>
      <h1>Benvenuto, questa applicazione ti permetterà di  tenere traccia delle tue spese!</h1>
      <div className="welcome-message">
        <p>Vuoi accedere o registrarti?</p>
      </div>
      <div className="button-container">
        <button onClick={handleLogin}>Accedi</button>
        <button onClick={handleRegistration}>Registrati</button>
      </div>
    </div>
  );
};

export default WelcomePage;

import React from 'react';

const WelcomePage: React.FC = () => {
  const handleLogin = () => {
    // Esegui qui la logica per mostrare il modulo di accesso
    // Esempio di reindirizzamento a una pagina di accesso
    window.location.href = '/login';
  };

  const handleRegistration = () => {
    // Esegui qui la logica per mostrare il modulo di registrazione
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

import React from 'react';

interface ErrorMessageProps {
  errorCode: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorCode }) => {
  let errorMessage = '';

  switch (errorCode) {
    case 400:
      errorMessage = 'Richiesta non valida';
      break;
    case 401:
      errorMessage = 'Autenticazione fallita';
      break;
    case 403:
      errorMessage = 'Accesso negato';
      break;
    case 500:
      errorMessage = 'Errore interno del server';
      break;
    default:
      errorMessage = 'Si è verificato un errore';
      break;
  }

  return (
    <div>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;





;



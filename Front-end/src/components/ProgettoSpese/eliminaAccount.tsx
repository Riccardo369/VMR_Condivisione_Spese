import React from 'react';
import PersonalAreaPage from './AreaPersonale';

const EliminaAccount: React.FC = () => {
  const Elimina = () => {
    // Logica per l'eliminazione dell'account
  };

  const TornaIndietro = () => {
    // Logica per tornare indietro
  };

  return (
    <>
      <title>Elimina account</title>
      <p>
        Se vuoi eliminare definitivamente l'account puoi premere il bottone, altrimenti torna indietro
      </p>
      <button>Elimina</button>
      <button onClick={PersonalAreaPage}>Torna indietro</button>
    </>
  );
};

export default EliminaAccount;

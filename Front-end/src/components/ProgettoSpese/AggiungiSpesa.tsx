import React from 'react';
import config from './config';

// Puoi accedere alle variabili come segue:
const jwtToken = config.jwtToken;
const serverAddress = config.serverAddress;
const serverPort = config.serverPort;


const AddExpensePage: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#B0C4DE" }}>
      <h2>
        <strong>Aggiungi spesa</strong>
      </h2>
      <h4>Scegli se aggiungere una spesa singola o di gruppo.</h4>
      <hr />
      <a href="SpesaSingola.html">
        <button>Singolo</button>
      </a>
      <a href="SpesaDiGruppo.html">
        <button>Gruppo</button>
      </a>
    </div>
  );
};

export default AddExpensePage;

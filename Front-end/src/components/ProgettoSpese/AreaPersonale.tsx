import React from 'react';
import config from './config';

// Puoi accedere alle variabili come segue:
const jwtToken = config.jwtToken;
const serverAddress = config.serverAddress;
const serverPort = config.serverPort;


const PersonalAreaPage: React.FC = () => {
  return (
    <div>
      <head>
        <link rel="stylesheet" href="AreaPersonale.css" />
        <title>Area Personale</title>
      </head>
      <body>
        <ul>
          <li>
            <a href="Portafoglio.html">Portafoglio personale</a>
          </li>
          <li>
            <a href="ListaCarte.html">Lista delle carte associate</a>
          </li>
          <li>
            <a href="CambiaPassword.html">Cambia Password</a>
          </li>
          <li>
            <a href="CambiaEmail.html">Cambia email</a>
          </li>
          <li>
            <a href="RicaricaAccount.html">Ricarica account e/o gestisci spese</a>
          </li>
          <li>
            <a href="SpesaSingola.tsx"> Effetua una spesa singola</a>
          </li>
          <li>
            <a href="SpesaDiGruppo.tsx"> Effetua una spesa di gruppo</a>
          </li>
        </ul>
      </body>
    </div>
  );
};

export default PersonalAreaPage;

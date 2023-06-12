import React, { useEffect, useState } from 'react';
import storage from '../SharedAreaVariables';
import WelcomePage from './Index';

const PersonalAreaPage: React.FC = () => {

  const [Nickname, SetNickname] = useState<string>('');
  const [Token_JWT, SetTokenJWT] = useState<string>('');

  useEffect(() => {

    const fetchData = async () => {
      SetNickname((await storage.getItem('Nickname'))+"" || '');
      SetTokenJWT((await storage.getItem('Token_JWT'))+"" || '');
    };

    fetchData();

  }, []);

  console.log("Token JWT ottenuto: "+Token_JWT);


  return (
    <div>
      <head>
        <link rel="stylesheet" href="AreaPersonale.css" />
        <title>Area Personale</title>
      </head>
      <body>
        <h4>Bentornato utente: {Nickname}</h4>
        <ul>
          <li>
            <a href="Portafoglio.tsx">Portafoglio personale</a>
          </li>
          <li>
            <a href="ListaCarte.tsx">Lista delle carte associate</a>
          </li>
          <li>
            <a href="CambiaPassword.tsx">Cambia Password</a>
          </li>
          <li>
            <a href="CambiaEmail.tsx">Cambia email</a>
          </li>
          <li>
            <a href="RicaricaAccount.tsx">Ricarica account e/o gestisci spese</a>
          </li>
          <li>
            <a href="SpesaSingola.tsx"> Effetua una spesa singola</a>
          </li>
          <li>
            <a href="SpesaDiGruppo.tsx"> Effetua una spesa di gruppo</a>
          </li>
          <li>
            <a href="eliminaAccount.tsx"> Elimina account</a>
          </li>
        </ul>
        <button onClick={WelcomePage}>Torna indietro</button>
      </body>
    </div>
  );
};

export default PersonalAreaPage;

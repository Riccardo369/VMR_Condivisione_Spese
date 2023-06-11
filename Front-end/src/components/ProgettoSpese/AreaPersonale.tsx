import React, { useEffect, useState } from 'react';
import storage from '../SharedAreaVariables';

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

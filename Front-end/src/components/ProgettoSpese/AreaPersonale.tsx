import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import storage from '../SharedAreaVariables';

const PersonalAreaPage: React.FC = () => {

  const handleIndex = async () => {

    await storage.setItem('Token_JWT', "");
    await storage.setItem('Nickname', "");

    window.location.href = "/";
  }

  const [Nickname, SetNickname] = useState<string>('');
  const [Token_JWT, SetTokenJWT] = useState<string>('');

  useEffect(() => {

    const fetchData = async () => {
      SetNickname((await storage.getItem('Nickname')) || '');
      SetTokenJWT((await storage.getItem('Token_JWT')) || '');
    };

    fetchData();

  }, []);

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
            <a href="SpesaDiGruppo.tsx"> Effettua una spesa di gruppo</a>
          </li>
          <li>
            <Link to="/DeleteAccount">Elimina account</Link>
          </li>
        </ul>
        <button onClick={handleIndex}>Torna indietro</button>
      </body>
    </div>
  );
};

export default PersonalAreaPage;

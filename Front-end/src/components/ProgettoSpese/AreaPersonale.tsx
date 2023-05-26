import React from 'react';

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
        </ul>
      </body>
    </div>
  );
};

export default PersonalAreaPage;

import React from 'react';
import {RequestServer, CryptingText} from '../SharedModule';
import storage from '../SharedAreaVariables';

const EliminaAccount: React.FC = () => {

  const DeleteAccount = async () => {

    const data = {
      "Password": (await CryptingText((document.getElementById("Password") as HTMLInputElement).value))
    }

    const headers = {
      "authorization": await storage.getItem('Token_JWT')+""
    }

    console.log("JWT passato: "+headers["authorization"]);

    const ErrorLabel = document.getElementById("Error Label");

    const Status = (await RequestServer("DELETE", "account", headers, JSON.stringify(data))).Status;

    if(Status === 200 && ErrorLabel){

      ErrorLabel.textContent = "Eliminazione dell' account effettuata con successo";

      await storage.setItem('Token_JWT', "");
      await storage.setItem('Nickname', "");

      window.location.href = '/';

    }

    if(Status === 400 && ErrorLabel) ErrorLabel.textContent = "I dati non sono passati nel modo corretto";
    if(Status === 401 && ErrorLabel) ErrorLabel.textContent = "Password non corretta";
    if(Status === 401 && ErrorLabel) ErrorLabel.textContent = "JWT o password non validi";
    if(Status === 500 && ErrorLabel) ErrorLabel.textContent = "Problema interno del server";
    
  };

  const TornaIndietro = () => {
    window.location.href = "/PersonalArea";
  };

  return (
    <>
      <title>Elimina account</title>
      <p>
        Se vuoi eliminare definitivamente l'account puoi premere il bottone, altrimenti torna indietro
      </p>
      <p>
      <input type="password" placeholder="Inserisci password" id="Password"/>
      </p>
      <p>
      <span id="Error Label" style={{ display: "block", marginBottom: "10px", color: "red"}}></span>
      </p>
      <p>
      <button onClick={DeleteAccount}>Elimina</button>
      </p>
      <p>
      <button onClick={TornaIndietro}>Torna indietro</button>
      </p>
    </>
  );
};

export default EliminaAccount;

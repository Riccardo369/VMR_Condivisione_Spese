
import CryptoJS from 'crypto-js';
import config from './config';
import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import ErrorMessage from './ErrorMessage';


const Error: React.FC = () => {
  const [error, setError] = useState<number | null>(null);

  const handleRequest = () => {
    axios.get('https://example.com/api')
      .then(response => {
        // Gestisci la risposta corretta
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          const statusCode = error.response.status;
          setError(statusCode);
        } else {
          setError(500); // Codice di errore generico
        }
      });
  };

  return (
    <div>
      <button onClick={handleRequest}>Effettua richiesta</button>
      {error && <ErrorMessage errorCode={error} />}
    </div>
  );
}

// Puoi accedere alle variabili come segue:
const jwtToken = config.jwtToken;
const serverAddress = config.serverAddress;
const serverPort = config.serverPort;


interface FormControl {
  invalid: boolean;
  // Altre proprietà del controllo
}

const MyComponent = () => {
  const emailFormControl: FormControl = { invalid: false };
  const passwordFormControl: FormControl = { invalid: false };
  const nicknameFormControl: FormControl = { invalid: false };

  const isEmailInvalid = () => {
    return emailFormControl && emailFormControl.invalid;
  };

  const isPasswordInvalid = () => {
    return passwordFormControl && passwordFormControl.invalid;
  };

  const isNicknameInvalid = () => {
    return nicknameFormControl && nicknameFormControl.invalid;
  };

  return (
    <div>
      {isEmailInvalid() && (
        <label style={{ color: 'red' }}>Email non valida</label>
      )}

      {isPasswordInvalid() && (
        <label style={{ color: 'red' }}>Password non valida</label>
      )}

      {isNicknameInvalid() && (
        <label style={{ color: 'red' }}>Nickname non valido</label>
      )}
    </div>
  );
};




const RegisterPage: React.FC = () => {

  async function CryptingSHA256(Text: string){
    return CryptoJS.SHA256(Text).toString();
  }


  const requestRegister = () => {
    const HostServer = "192.168.31.54";
    const PortServer = 3000;

    const data = {
      FirstName: (document.getElementById("Nome") as HTMLInputElement).value,
      LastName: (document.getElementById("Cognome") as HTMLInputElement).value,
      Nickname: (document.getElementById("Nickname") as HTMLInputElement).value,
      TelephoneNumber: (document.getElementById("Numero di telefono") as HTMLInputElement).value,
      Email: (document.getElementById("Email") as HTMLInputElement).value,
      Password: CryptingSHA256((document.getElementById("Password") as HTMLInputElement).value),
    };

    fetch("http://"+HostServer+":"+PortServer+"/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        // gestisci la risposta del server qui
        console.log(data);
      })
      .catch(error => {
        console.log("ERRORE OLè");
        // gestisci gli errori qui
        console.error('Errore:', error);
      });
  };

  return (
    <div>
      <fieldset style={{ border: '2px double rgb(0, 51, 128)' }}>
        <legend style={{ color: 'blueviolet', fontFamily: 'papyrus' }}>
          <strong>SEP</strong>
        </legend>
      </fieldset>

      <body style={{ backgroundColor: '#FFDEAD' }}>
        <h3>
          <em>Completa tutti i campi per completare la registrazione</em>
        </h3>

        <div>
          <p style={{ textAlign: 'center' }}>
            Inserisci nome:
            <input type="text" id="Nome" placeholder="Nome"  />

            <br />
            <br />

            Inserisci cognome:
            <input type="text" id="Cognome" placeholder="Cognome" />

            <br />
            <br />

            Inserisci nickname:
            <input type="text" id="Nickname" placeholder="Nickname"  />
          </p>
        </div>

        <br />
        <br />

        <div>
          <p style={{ textAlign: 'center' }}>
            Inserisci numero di telefono:
            <input
              type="number"
              id="Numero di telefono"
              placeholder="Numero di telefono"
            
            />

            <br />
            <br />

            Inserisci email:
            <input type="email" id="Email" placeholder="Inserisci email"  />
          </p>
        </div>

        <br />
        <br />

        <p style={{ textAlign: 'center' }}>
          Scegli una password:
          <input type="password" id="Password" placeholder="Inserisci password" />
        </p>

        <p style={{ textAlign: 'center' }}>
          <button onClick={requestRegister}>Conferma</button>
        </p>
      </body>
    </div>
  );
};

export default RegisterPage;

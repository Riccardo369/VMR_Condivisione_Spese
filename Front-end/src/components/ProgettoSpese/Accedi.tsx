
import config from './config';
import axios, { AxiosError } from 'axios';
import ErrorMessage from './ErrorMessage';
import React, { useState } from 'react';


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

const MyComponent2 = () => {
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


class RequestServer{

  HostServer = "127.0.0.1";
  PortServer = 3000;

  Request(Method: string, Path: string, headers: {[key: string]: string}, Body: string){
  
    const HeadersValues = new Headers();
    for(let l in headers) HeadersValues.append(l, headers[l]);

    fetch("http://" + this.HostServer + ":" + this.PortServer + "/" + Path, {
      method: Method,
      headers: HeadersValues,
      body: Body
    })
      .then(response => response.json())
      .then(data => {
        //gestisci la risposta del server qui
        console.log(data);
      })
      .catch((error) => {
        console.log("ERRORE OLè");
        //gestisci gli errori qui
        console.error('Errore:', error);
      });

  }
}

const MyComponent: React.FC = () => {
  const RequestLogin = () => {
    let HostServer = "192.168.31.54";
    let PortServer = 3000;

    console.log("RequestLogin");

    const data = {
      "Nickname": (document.getElementById("Nickname") as HTMLInputElement).value,
      "Password": (document.getElementById("Password") as HTMLInputElement).value
    };

    new RequestServer().Request("POST", "/Login", {}, JSON.stringify(data));
  };

  return (
    <fieldset style={{ border: "2px double rgb(0, 51, 128)" }}>
      <legend style={{ color: "blueviolet", fontFamily: "papyrus" }}>
        <strong>SEP</strong>
      </legend>
      <body style={{ backgroundColor: "#B0C4DE" }}>
        <h3>
          <em>Inserisci i tuoi dati per accedere</em>
        </h3>
        <div>
          <p style={{ textAlign: "center" }}>
            Inserisci nickname:
            <input type="text" placeholder="Nickname" id="Nickname" />
          </p>
        </div>
        <br />
        <div>
          <p style={{ textAlign: "center" }}>
            Inserisci password:
            <input type="password" placeholder="Inserisci password" id="Password" />
          </p>
        </div>
        <br />
        <p style={{ textAlign: "center" }}>
          <button onClick={RequestLogin}>Conferma</button>
        </p>
      </body>
    </fieldset>
  );
};

export default MyComponent;

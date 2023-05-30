import React from 'react';
const CryptoJS = require("crypto-js");

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

    fetch(`http://${HostServer}:${PortServer}/register`, {
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
            <input type="text" id="Nome" placeholder="Nome" value="Veronika" />

            <br />
            <br />

            Inserisci cognome:
            <input type="text" id="Cognome" placeholder="Cognome" value="Moriconi" />

            <br />
            <br />

            Inserisci nickname:
            <input type="text" id="Nickname" placeholder="Nickname" value="Vero47" />
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
              value="1113334449"
            />

            <br />
            <br />

            Inserisci email:
            <input type="email" id="Email" placeholder="Inserisci email" value="vero.moriconi@gmail.com" />
          </p>
        </div>

        <br />
        <br />

        <p style={{ textAlign: 'center' }}>
          Scegli una password (contenente almeno 8 caratteri, una maiuscola e un carattere speciale):
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

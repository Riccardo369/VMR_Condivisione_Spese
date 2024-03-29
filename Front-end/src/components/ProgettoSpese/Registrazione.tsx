import {RequestServer, CryptingText} from '../SharedModule';

const RegisterPage: React.FC = () => {

  const handleIndex = () => {
    window.location.href = "/";
  }

  const requestRegister = async () => {


    console.log("RequestRegister");

    const data = {
      FirstName: (document.getElementById("Nome") as HTMLInputElement).value,
      LastName: (document.getElementById("Cognome") as HTMLInputElement).value,
      Nickname: (document.getElementById("Nickname") as HTMLInputElement).value,
      TelephoneNumber: (document.getElementById("Numero di telefono") as HTMLInputElement).value,
      Email: (document.getElementById("Email") as HTMLInputElement).value,
      Password: (await CryptingText((document.getElementById("Password") as HTMLInputElement).value)),
    };

    let ErrorLabel = document.getElementById("Error Label");
    if(ErrorLabel) ErrorLabel.textContent = "...";

    let Response = await RequestServer("POST", "register", {}, JSON.stringify(data));
    let Status = Response.Status;

    if(Status === 200 && ErrorLabel){

      ErrorLabel.textContent = "Registrazione consentita";
      window.location.href = '/login';
    }

    else if(Status === 400 && ErrorLabel) ErrorLabel.textContent = "I dati non sono stati passati nel modo corretto";
    else if(Status === 403 && ErrorLabel) ErrorLabel.textContent = "Questo account esiste già";
    else if(Status === 500 && ErrorLabel) ErrorLabel.textContent = "Il server sta avendo problemi interni di funzionamento";
    else if(Status === null && ErrorLabel) ErrorLabel.textContent = "Il server non risponde";

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
            <input type="text" id="Nome" placeholder="Nome"/>

            <br />
            <br />

            Inserisci cognome:
            <input type="text" id="Cognome" placeholder="Cognome"/>

            <br />
            <br />

            Inserisci nickname:
            <input type="text" id="Nickname" placeholder="Nickname"/>
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
            <input type="email" id="Email" placeholder="Inserisci email"/>
          </p>
        </div>

        <br />
        <br />

        <p style={{ textAlign: 'center' }}>
          Scegli una password:
          <input type="password" id="Password" placeholder="Inserisci password"/>
        </p>

        <p style={{ textAlign: 'center' }}>
        <span id="Error Label" style={{ display: "block", marginBottom: "10px", color: "red"}}>
          
          </span>
          <p>
          <button onClick={requestRegister}>Conferma</button>
          </p>
          <p>
          <button onClick={handleIndex}>Torna indietro</button>
          </p>
        </p>
      </body>
    </div>
  );
};

export default RegisterPage;

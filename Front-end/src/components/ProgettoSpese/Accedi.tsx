import {RequestServer, CryptingText} from '../SharedModule';
import storage from '../SharedAreaVariables';

const MyComponent: React.FC = () => {

  const handleIndex = () => {
    window.location.href = "/";
  }

  const RequestLogin = async () => {

    console.log("RequestLogin");

    const data = {
      "Nickname": (document.getElementById("Nickname") as HTMLInputElement).value,
      "Password": (await CryptingText((document.getElementById("Password") as HTMLInputElement).value))
    };

    let ErrorLabel = document.getElementById("Error Label");
    if(ErrorLabel) ErrorLabel.textContent = "...";

    let Response = await RequestServer("POST", "login", {}, JSON.stringify(data));
    let Status = Response.Status;

    if(Status === 200 && ErrorLabel){

      ErrorLabel.textContent = "Accesso consentito";

      await storage.setItem('Token_JWT', ""+Response.Headers.get("Authorization"));
      await storage.setItem('Nickname', (document.getElementById("Nickname") as HTMLInputElement).value);

      window.location.href = '/PersonalArea';
    }

    else if(Status === 400 && ErrorLabel)  ErrorLabel.textContent = "I dati non sono stati passati nel modo corretto";
    else if(Status === 401 && ErrorLabel)  ErrorLabel.textContent = "Credenziali non valide";
    else if(Status === 403 && ErrorLabel)  ErrorLabel.textContent = "La tua richiesta è stata bloccata";
    else if(Status === 500 && ErrorLabel)  ErrorLabel.textContent = "Il server sta avendo problemi interni di funzionamento";
    else if(Status === null && ErrorLabel) ErrorLabel.textContent = "Il server non risponde";

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
            <input type="text" placeholder="Nickname" id="Nickname"/>
          </p>
        </div>
        <br />
        <div>
          <p style={{ textAlign: "center" }}>
            Inserisci password:
            <input type="password" placeholder="Inserisci password" id="Password"/>
          </p>
        </div>
        <br />
        <p style={{ textAlign: "center" }}>
        <span id="Error Label" style={{ display: "block", marginBottom: "10px", color: "red"}}>
          
        </span>
          <p>
          <button onClick={RequestLogin}>Conferma</button>
          </p>
          <p>
          <button onClick={handleIndex}>Torna indietro</button>
          </p>
        </p>
      </body>
    </fieldset>
  );
};

export default MyComponent;

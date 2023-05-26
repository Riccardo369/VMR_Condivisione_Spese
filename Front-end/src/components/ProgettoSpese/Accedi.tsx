import React from 'react';

const MyComponent: React.FC = () => {
  const RequestLogin = () => {
    let HostServer = "192.168.31.54";
    let PortServer = 3000;

    const data = {
      "Nickname": (document.getElementById("Nickname") as HTMLInputElement).value,
      "Password": (document.getElementById("Password") as HTMLInputElement).value
    };

    fetch("http://" + HostServer + ":" + PortServer + "/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        //gestisci la risposta del server qui
        //console.log(data);
      })
      .catch((error) => {
        //console.log("ERRORE OLè");
        //gestisci gli errori qui
        //console.error('Errore:', error);
      });
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

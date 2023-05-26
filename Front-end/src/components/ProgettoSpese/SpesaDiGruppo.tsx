import React from 'react';

const GroupExpensePage: React.FC = () => {
  return (
    <div>
      <body>
        <h4>Aggiungi i partecipanti di questa spesa</h4>
        <input type="text" placeholder="Partecipante 1" /> <br />
        <input type="text" placeholder="Partecipante 2" /> <br />
        <input type="text" placeholder="Partecipante 3" /> <br />
        <input type="text" placeholder="Partecipante 4" /> <br />
      </body>

      <br />

      <a href="SpesaDiGruppo2.html">
        <button>Continua</button>{' '}
      </a>
    </div>
  );
};

export default GroupExpensePage;

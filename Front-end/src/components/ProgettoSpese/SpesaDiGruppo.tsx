import React, { useState } from 'react';
import config from './config';

// Puoi accedere alle variabili come segue:
const jwtToken = config.jwtToken;
const serverAddress = config.serverAddress;
const serverPort = config.serverPort;


interface Participant {
  id: number;
  name: string;
  text: string;
}

const GroupExpensePage: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: 'Partecipante 1', text: '' },
    { id: 2, name: 'Partecipante 2', text: '' },
    { id: 3, name: 'Partecipante 3', text: '' },
    { id: 4, name: 'Partecipante 4', text: '' },
  ]);

  const handleTextChange = (id: number, newText: string) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.id === id ? { ...participant, text: newText } : participant
      )
    );
  };

  return (
    <div>
      <h4>Aggiungi i partecipanti di questa spesa</h4>
      {participants.map((participant) => (
        <div key={participant.id}>
          <input
            type="text"
            placeholder={participant.name}
            value={participant.text}
            onChange={(e) => handleTextChange(participant.id, e.target.value)}
          />
        </div>
      ))}
      <br />
      
        <button>Continua</button>
      
    </div>
  );
};

export default GroupExpensePage;


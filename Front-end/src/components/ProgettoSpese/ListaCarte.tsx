import React, { useState } from 'react';
import config from './config';

// Puoi accedere alle variabili come segue:
const jwtToken = config.jwtToken;
const serverAddress = config.serverAddress;
const serverPort = config.serverPort;


interface CreditCard {
  name: string;
  number: string;
  type: string;
}

const CreditCardList: React.FC = () => {
  const [cardData, setCardData] = useState<CreditCard[]>([]);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('Visa');

  const addCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newCard: CreditCard = {
      name: cardName,
      number: cardNumber,
      type: cardType,
    };

    setCardData([...cardData, newCard]);
    setCardName('');
    setCardNumber('');
    setCardType('Visa');
  };

  return (
    <div>
      <h1>Gestione Carte di Credito</h1>

      <form onSubmit={addCard}>
        <label htmlFor="cardName">Nome sulla carta:</label>
        <input
          type="text"
          id="cardName"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />

        <label htmlFor="cardNumber">Numero di carta:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />

        <label htmlFor="cardType">Tipo di carta:</label>
        <select
          id="cardType"
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
          required
        >
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="American Express">American Express</option>
        </select>

        <button type="submit">Aggiungi carta</button>
      </form>

      <div>
        {cardData.map((card, index) => (
          <div className="credit-card" key={index}>
            <p>
              <strong>Nome:</strong> {card.name}
              <br />
              <strong>Numero:</strong> {card.number}
              <br />
              <strong>Tipo:</strong> {card.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditCardList;

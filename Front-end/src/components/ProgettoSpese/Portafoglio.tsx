import React, { useState } from 'react';
import config from './config';

// Puoi accedere alle variabili come segue:
const jwtToken = config.jwtToken;
const serverAddress = config.serverAddress;
const serverPort = config.serverPort;


const Wallet: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [transactionAmount, setTransactionAmount] = useState('');

  const handleDeposit = () => {
    const amount = parseFloat(transactionAmount);
    if (!isNaN(amount)) {
      setBalance(prevBalance => prevBalance + amount);
      setTransactionAmount('');
    }
  };

  const handleWithdrawal = () => {
    const amount = parseFloat(transactionAmount);
    if (!isNaN(amount) && balance >= amount) {
      setBalance(prevBalance => prevBalance - amount);
      setTransactionAmount('');
    }
  };

  return (
    <div>
      <h2>Portafoglio</h2>
      <p>Saldo: {balance} EUR</p>

      <div>
        <label htmlFor="transactionAmount">Importo:</label>
        <input
          type="text"
          id="transactionAmount"
          value={transactionAmount}
          onChange={e => setTransactionAmount(e.target.value)}
        />
      </div>

      <div>
        <button onClick={handleDeposit}>Deposita</button>
        <button onClick={handleWithdrawal}>Prelievo</button>
      </div>
    </div>
  );
};

export default Wallet;

import React, { useEffect, useState } from 'react';

const FinancialStatus: React.FC = () => {
  const [balanceData, setBalanceData] = useState(1500);
  const [debtData, setDebtData] = useState(500);

  useEffect(() => {
    renderFinanceData();
  }, []);

  const renderFinanceData = () => {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
      balanceElement.innerHTML = `Saldo: <span class="${balanceData >= 0 ? 'green' : 'red'}">${balanceData}€</span>`;
    }

    const debtElement = document.getElementById('debt');
    if (debtElement) {
      debtElement.innerHTML = `Debiti: <span class="${debtData > 0 ? 'red' : ''}">${debtData}€</span>`;
    }
  };

  return (
    <div>
      <h1>Gestione Finanziaria</h1>

      <div id="balance" className="balance"></div>
      <div id="debt" className="debt"></div>

      <script>{renderFinanceData.toString()}</script>
    </div>
  );
};

export default FinancialStatus;

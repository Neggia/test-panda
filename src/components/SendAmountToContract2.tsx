import React, { useState } from 'react';

interface Props {
  onSendAmount: (amount: number) => void;
}

const SendAmountToContract: React.FC<Props> = ({ onSendAmount }) => {
  const [amount, setAmount] = useState('1000');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSendAmount = () => {
    const satoshis = parseInt(amount);
    if (isNaN(satoshis)) {
      alert('Please enter a valid number');
      return;
    }
    onSendAmount(satoshis);
  };

  return (
    <div>
      <label htmlFor="satoshis-amount">Satoshis amount: </label>
      <input
        id="satoshis-amount"
        type="number"
        value={amount}
        onChange={handleAmountChange}
      />
      <button onClick={handleSendAmount}>Send amount to contract TestPanda2 (can't sign with Panda wallet)</button>
    </div>
  );
};

export default SendAmountToContract;

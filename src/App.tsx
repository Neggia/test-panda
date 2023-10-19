import React from 'react';
import { useState, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import { TestPanda } from "./contracts/testPanda";
import { TestPanda2 } from './contracts/testPanda2';
import ConnectWalletButton from './components/ConnectWalletButton';
import SendAmountToContract from './components/SendAmountToContract';
import SendAmountToContract2 from './components/SendAmountToContract2';
import { Signer,PubKey, toHex, toByteString } from 'scrypt-ts';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const signerRef = useRef<Signer>();

  const onWalletConnected = async (signer: Signer) => {
    signerRef.current = signer;

    const isWalletConnected: boolean = await signer.isAuthenticated()
    if (isWalletConnected) {
      setIsWalletConnected(true);
    }
  };

  const handleSendAmount = async (amount: number) => {
    try {
      const signer = signerRef.current as Signer;

      const wholeAmount = Math.round(amount);
      const amountBigInt: bigint = BigInt(wholeAmount);
      const instance = new TestPanda(amountBigInt);
      await instance.connect(signer);
      const tx = await instance.deploy(wholeAmount)

      console.log('tx.id: ', tx.id)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Error:', error);
      }
      alert('deploy fails')
    }
  };

  const handleSendAmount2 = async (amount: number) => {
    try {
      const signer = signerRef.current as Signer;

      const userPK: PubKey = PubKey(toHex(await signer.getDefaultPubKey()));
      const wholeAmount = Math.round(amount);
      const amountBigInt: bigint = BigInt(wholeAmount);
      const instance = new TestPanda2(amountBigInt);
      await instance.connect(signer);
      const tx = await instance.deploy(wholeAmount)

      console.log('tx.id: ', tx.id)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Error:', error);
      }
      alert('deploy fails')
    }
  };

  const signerRefObject: React.RefObject<Signer> = {
    current: signerRef.current || null
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Connect to Chrome wallet</h1>
          <ConnectWalletButton onConnected={onWalletConnected} />
        </div>
        <div>
          <h1>Send amount to contract</h1>
          <SendAmountToContract onSendAmount={handleSendAmount} />
          <SendAmountToContract2 onSendAmount={handleSendAmount2} />
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

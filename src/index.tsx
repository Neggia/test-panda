import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TestPanda } from './contracts/testPanda';
import { TestPanda2 } from './contracts/testPanda2';

var artifact = require('../artifacts/testPanda.json');
TestPanda.loadArtifact(artifact);
var artifact2 = require('../artifacts/testPanda2.json');
TestPanda2.loadArtifact(artifact2);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // On s'assure que le style global est chargé ici

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Erreur fatale : L'élément racine #root est introuvable. Vérifiez votre fichier index.html.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
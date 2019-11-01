import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App/App';
import { CharacterProvider } from './contexts/CharacterContext';
import './index.css';

ReactDOM.render(
  <CharacterProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CharacterProvider>,
  document.getElementById('root')
);

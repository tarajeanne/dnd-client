import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './Components/App/App';
import { CharacterProvider } from './contexts/CharacterContext';


ReactDOM.render(
  <CharacterProvider>
    <BrowserRouter>
          <App />
    </BrowserRouter>
  </CharacterProvider>,
  document.getElementById('root')
)

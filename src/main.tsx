import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import RecipesProvider from './context/RecipesProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <RecipesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipesProvider>,
  );

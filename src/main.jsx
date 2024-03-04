import React from 'react'
import ReactDOM from 'react-dom'
import './static/css/index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import { inject } from '@vercel/analytics';

inject();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

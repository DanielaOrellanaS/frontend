import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './index.css';
import App from './App';
import Actions from './Routes/Actions';
import Alerts from './Routes/Alerts';
import Reports from './Routes/Reports';
import Settings from './Routes/Settings';
import Accounts from './Routes/Accounts';
import FormCreate from './Components/FormCreate';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/actions" element={<Actions />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/createaccount" element={<FormCreate />} />
      </Routes>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

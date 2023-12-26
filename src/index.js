import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './index.css';
import App from './App';
import Notices from './Routes/Notices';
import Reports from './Routes/Reports';
import Settings from './Routes/Settings';
import Accounts from './Routes/Accounts';
import FormCreate from './Components/FormCreate';
import Indicator from './Routes/Indicator';
import EventDetail from './Components/EventDetail';

const root = document.getElementById('root');

const rootElement = (
  <Router>
    <Routes>
      <Route path="/" element={<App />} /> 
      <Route path="/notices" element={<Notices />} />
      <Route path="/indicator" element={<Indicator />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/createaccount" element={<FormCreate />} />
      <Route path="/detalle-evento/:nameEvent" element={<EventDetail />} />
    </Routes>
  </Router>
);

createRoot(root).render(rootElement);

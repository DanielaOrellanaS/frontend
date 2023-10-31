import React, { useState, useRef } from 'react';
import MenuFooter from '../Components/MenuFooter';
import { indicators, accounts, evolutionIndicator } from '../constants';
import '../routes.css';

function Reports() {
  const [selectedOption, setSelectedOption] = useState('indicadores');
  const iframeRef = useRef(null);

  const handleTabChange = (option) => {
    setSelectedOption(option);
    iframeRef.current.blur();
  };

  return (
    <div className="container">
      <h1>Reportes</h1>
      <div className="reports-container">
        <div className="tabs">
          <div
            className={`tab ${selectedOption === 'indicadores' ? 'active' : ''}`}
            onClick={() => handleTabChange('indicadores')}
          >
            Indicadores
          </div>
          <div
            className={`tab ${selectedOption === 'cuentas' ? 'active' : ''}`}
            onClick={() => handleTabChange('cuentas')}
          >
            Cuentas
          </div>
          <div
            className={`tab ${selectedOption === 'evolucion' ? 'active' : ''}`}
            onClick={() => handleTabChange('evolucion')}
          >
            Evolucion
          </div>
        </div>
        <div className="content-container">
          <iframe
            title="Report Content"
            ref={iframeRef}
            src={selectedOption === 'indicadores' ? indicators : selectedOption === 'cuentas' ? accounts : evolutionIndicator}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
        <MenuFooter/>
      </div>
    </div>
  );
}

export default Reports;

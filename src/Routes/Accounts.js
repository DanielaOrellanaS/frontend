import React, { useState } from 'react';
import '../routes.css';
import MenuFooter from '../Components/MenuFooter';

function Accounts() {
  const [isTableOpen, setIsTableOpen] = useState(false);

  const toggleTable = () => {
    setIsTableOpen(!isTableOpen);
  };

  const resumeTable = [
    ['Balance', 'Flotante', '%Flotante-Balance'],
    [50.000, 18.20, '98%'],
  ];

  const tableData = [
    { label: 'Balance', value: '50,000.00' },
    { label: 'Equidad', value: '57,692.91' },
    { label: 'Flotante', value: '18.20' },
    { label: 'Ganancia Día', value: '1.20' },
    { label: 'Num Operaciones', value: '10' },
  ];

  const colaData = [
    ['GBPAUD', 'GBPUSD', 'AUDCAD', 'AUDUSD', 'USDJPY'],
    [9, 2, 3, 5, 2],
  ];

  const operationsOpen = [
    ['Simbolo', 'Tipo', 'Lotes', 'PrecioOpen', 'FechaOpen', 'FechaClose', 'PrecioClose', 'TP', 'SL', 'Profit'],
    [9, 2, 3, 5, 2, 5, 3, 2, 3, 5],
  ];

  const operationsClose = [
    ['Simbolo', 'Tipo', 'Lotes', 'PrecioOpen', 'FechaOpen', 'FechaClose', 'PrecioClose', 'TP', 'SL', 'Profit'],
    [9, 2, 3, 5, 2, 5, 3, 2, 3, 5],
  ];

  return (
    <div>
      <div className="container">
      <h1>Cuentas</h1>
        <div className="collapsible-container">
          <div className="custom-table-container">
            <div className="custom-table-box">
              <div className="collapsible-header" onClick={toggleTable}>
                NEO
              </div>
              {!isTableOpen && (
                <div className="resume-table">
                  <table>
                    <tbody>
                      {resumeTable.map((rowData, rowIndex) => (
                          <tr key={rowIndex}>
                            {rowData.map((cellData, cellIndex) => (
                              <td key={cellIndex}>{cellData}</td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
              {isTableOpen && (
                <div className="grid-container">
                  <div className="table-container">
                    <table className="custom-table">
                      <tbody>
                        {tableData.map((data) => (
                          <tr key={data.label}>
                            <td>{data.label}</td>
                            <td>{data.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="table-container">
                    <table className="custom-table-second second-table">
                      <thead>
                        <tr>
                          <th colSpan={colaData[0].length}>Colas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {colaData.map((rowData, rowIndex) => (
                          <tr key={rowIndex}>
                            {rowData.map((cellData, cellIndex) => (
                              <td key={cellIndex}>{cellData}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="table-container">
                    <table className="custom-table-second second-table">
                      <thead>
                        <tr>
                          <th colSpan={operationsOpen[0].length}>Operaciones Abiertas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {operationsOpen.map((rowData, rowIndex) => (
                          <tr key={rowIndex}>
                            {rowData.map((cellData, cellIndex) => (
                              <td key={cellIndex}>{cellData}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="table-container">
                    <table className="custom-table-second second-table">
                      <thead>
                        <tr>
                          <th colSpan={operationsClose[0].length}>Operaciones Cerradas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {operationsClose.map((rowData, rowIndex) => (
                          <tr key={rowIndex}>
                            {rowData.map((cellData, cellIndex) => (
                              <td key={cellIndex}>{cellData}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <MenuFooter />
    </div>
  );
}

export default Accounts;

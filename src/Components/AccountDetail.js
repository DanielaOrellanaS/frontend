import React, { useState } from 'react';
import '../routes.css';

function AccountDetail({ accountName, balance, flotante, percentage, equity, gain, numOperations, colas, openOperations, closedOperations, getColorClass }) {
  const [isTableOpen, setIsTableOpen] = useState(false);

  const toggleTable = () => {
    setIsTableOpen(!isTableOpen);
  };

  const formatNumber = (number) => {
    if (number || number === 0) {
      return number.toLocaleString('es');
    }
    return '0';
  };

  return (
    <div className="collapsible-container">
      <div className="custom-table-container">
        <div className="custom-table-box">
          <div className="collapsible-header" onClick={toggleTable}>
            {accountName}
          </div>
          {!isTableOpen && (
            <div className="resume-table">
              <table>
                <tbody>
                  <tr>
                    <td className={getColorClass(balance)}>{formatNumber(balance)}</td>
                    <td className={getColorClass(flotante)}>{formatNumber(flotante)}</td>
                    <td>{formatNumber(percentage)}{'%'}</td>
                  </tr> 
                </tbody>
              </table>
            </div>
          )}
          {isTableOpen && (
            <div className="grid-container">
              <div className="table-container">
                <table className="custom-table">
                  <tbody>
                    <tr>
                      <td>Balance:</td>
                      <td>{formatNumber(balance)}</td>
                    </tr>
                    <tr>
                      <td>Flotante:</td>
                      <td>{formatNumber(flotante)}</td>
                    </tr>
                    <tr>
                      <td>Porcentaje:</td>
                      <td>{formatNumber(percentage)}</td>
                    </tr>
                    <tr>
                      <td>Equidad:</td>
                      <td>{formatNumber(equity)}</td>
                    </tr>
                    <tr>
                      <td>Ganancia Día:</td>
                      <td>{formatNumber(gain)}</td>
                    </tr>
                    <tr>
                      <td>Num Operaciones:</td>
                      <td>{numOperations}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-container">
                <table className="custom-table-second second-table">
                  <thead>
                    <tr>
                      <th>Colas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colas && colas.length > 0 ? (
                      colas.map((cola, index) => (
                        <tr key={index}>
                          <td>{cola.symbol}</td>
                          <td>{cola.open_operations}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">No hay datos de colas</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="table-container">
                <table className="custom-table-second second-table">
                  <thead>
                    <tr>
                      <th colSpan={openOperations.length > 0 ? Object.keys(openOperations[0]).length : 1}>
                        Operaciones Abiertas
                      </th>
                    </tr>
                  </thead>
                  {openOperations.length > 0 ? (
                    <tbody>
                      <tr>
                        {Object.keys(openOperations[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                      {openOperations.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.values(rowData).map((value, index) => (
                            <td key={index}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan={1}>No hay datos de operaciones abiertas</td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
              <div className="table-container">
                <table className="custom-table-second second-table">
                  <thead>
                    <tr>
                      <th colSpan={closedOperations.length > 0 ? Object.keys(closedOperations[0]).length : 1}>
                        Operaciones Cerradas
                      </th>
                    </tr>
                  </thead>
                  {closedOperations.length > 0 ? (
                    <tbody>
                      <tr>
                        {Object.keys(closedOperations[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                      {closedOperations.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.values(rowData).map((value, index) => (
                            <td key={index}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan={1}>No hay datos de operaciones cerradas</td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountDetail;

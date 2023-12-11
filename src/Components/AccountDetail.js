import React, { useState } from 'react';
import '../routes.css';

function AccountDetail({ accountName, balance, flotante, percentage, equity, gain, numOperations, openOperations, closedOperations }) {
  const [isTableOpen, setIsTableOpen] = useState(false);

  const toggleTable = () => {
    setIsTableOpen(!isTableOpen);
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
                    <td>{balance}</td>
                    <td>{flotante}</td>
                    <td>{percentage}</td>
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
                      <td>{balance}</td>
                    </tr>
                    <tr>
                      <td>Flotante:</td>
                      <td>{flotante}</td>
                    </tr>
                    <tr>
                      <td>Porcentaje:</td>
                      <td>{percentage}</td>
                    </tr>
                    <tr>
                      <td>Equidad:</td>
                      <td>{equity}</td>
                    </tr>
                    <tr>
                      <td>Ganancia Día:</td>
                      <td>{gain}</td>
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
                      <th colSpan={openOperations && openOperations.length > 0 ? Object.keys(openOperations[0]).length : 0}>Operaciones Abiertas</th>
                    </tr>
                    <tr>
                      {openOperations.length > 0 &&
                        Object.keys(openOperations[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {openOperations.map((rowData, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(rowData).map((value, index) => (
                          <td key={index}>{value}</td>
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
                      <th colSpan={closedOperations && closedOperations.length > 0 ? Object.keys(closedOperations[0]).length : 0}>Operaciones Cerradas</th>
                    </tr>
                    <tr>
                      {closedOperations.length > 0 &&
                        Object.keys(closedOperations[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {closedOperations.map((rowData, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(rowData).map((value, index) => (
                          <td key={index}>{value}</td>
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
  );
}

export default AccountDetail;

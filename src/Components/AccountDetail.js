import React, { useState } from 'react';

function Account({ accountName, resumeTable, tableData, colaData, operationsOpen, operationsClose }) {
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
  );
}

export default Account;

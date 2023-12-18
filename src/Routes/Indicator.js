import React, { useEffect, useState } from 'react';
import MenuFooter from '../Components/MenuFooter';
import '../routes.css';
import { getLastIndicators, getPairs } from '../Api';

function Indicator() {
  const [tableData5, setTableData5] = useState([]);
  const [tableData15, setTableData15] = useState([]);

  const fetchData = async () => {
    try {
      const indicators = await getLastIndicators();
      const pairsData = await getPairs();
      const pairsMap = new Map(pairsData.results.map(pair => [pair.id, pair.pares]));

      const dataWithPairs5 = indicators.results.filter(rowData => rowData.time_frame === 5).map(rowData => ({
        ...rowData,
        pairName: pairsMap.get(rowData.par) || 'N/A',
      }));

      const dataWithPairs15 = indicators.results.filter(rowData => rowData.time_frame === 15).map(rowData => ({
        ...rowData,
        pairName: pairsMap.get(rowData.par) || 'N/A',
      }));

      setTableData5(dataWithPairs5);
      setTableData15(dataWithPairs15);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTable = (data) => {
    return (
      <div className="table-container-indicator">
        <table className="custom-table-indicator">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Moneda</th>
              <th>PC1</th>
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, index) => {
              const formattedDate = new Date(rowData.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              });
              const pc1Class = rowData.pc1 && rowData.pc1 > 70 ? 'blue-text' : rowData.pc1 && rowData.pc1 < 70 ? 'red-text' : '';
              const formattedPC1 = rowData.pc1 ? parseFloat(rowData.pc1).toFixed(4) : 'N/A';
              return (
                <tr key={index}>
                  <td>{formattedDate}</td>
                  <td>{rowData.pairName}</td>
                  <td className={`pc1 ${pc1Class}`}>{formattedPC1}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h1>Indicador</h1>
      <div>
        <h2>Time frame 5</h2>
        {renderTable(tableData5)}
      </div>
      <div>
        <h2>Time frame 15</h2>
        {renderTable(tableData15)}
      </div>
      <div className="space"></div>
      <MenuFooter />
    </div>
  );  
}

export default Indicator;

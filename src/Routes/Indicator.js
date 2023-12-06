import React, { useEffect, useState } from 'react';
import MenuFooter from '../Components/MenuFooter';
import '../routes.css';
import { getLastIndicators, getPairs } from '../Api'; 

function Indicator() {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const indicators = await getLastIndicators();
      const pairsData = await getPairs();
      const pairsMap = new Map(pairsData.results.map(pair => [pair.id, pair.pares]));
  
      const dataWithPairs = indicators.results.map(rowData => ({
        ...rowData,
        pairName: pairsMap.get(rowData.par) || 'N/A', 
      }));
  
      setTableData(dataWithPairs);
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

  return (
    <div>
      <h1>Indicador</h1>
      <div className="table-container-indicator">
        <table className="custom-table-indicator">
          <thead>
            <tr>
              <th>Date</th>
              <th>Moneda</th>
              <th>PC1</th>
              <th>Time_frame</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData, index) => {
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
                  <td>{rowData.time_frame}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <MenuFooter />
    </div>
  );
}

export default Indicator;

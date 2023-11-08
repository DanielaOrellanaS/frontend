import React, { useEffect, useState } from 'react';
import '../routes.css';
import MenuFooter from '../Components/MenuFooter';
import AccountDetail from '../Components/AccountDetail';
import { getAccountNames } from '../Api';

function Accounts() {
  const [accountNames, setAccountNames] = useState([]);

  useEffect(() => {
    async function fetchAccountNames() {
      try {
        const names = await getAccountNames();
        setAccountNames(names);
      } catch (error) {
        console.error('Error al obtener los nombres de las cuentas:', error);
      }
    }

    fetchAccountNames();
  }, []); 

  return (
    <div>
      <div className="container">
        <h1>Cuentas</h1>
        {accountNames.map((accountName) => (
          <AccountDetail
            key={accountName}
            accountName={accountName}
            resumeTable={[
              ['Balance', 'Flotante', '%Flotante-Balance'],
              [50.000, 18.20, '98%'],
            ]}
            tableData={[
              { label: 'Balance', value: '50,000.00' },
              { label: 'Equidad', value: '57,692.91' },
              { label: 'Flotante', value: '18.20' },
              { label: 'Ganancia Día', value: '1.20' },
              { label: 'Num Operaciones', value: '10' },
            ]}
            colaData={[
              ['GBPAUD', 'GBPUSD', 'AUDCAD', 'AUDUSD', 'USDJPY'],
              [9, 2, 3, 5, 2],
            ]}
            operationsOpen={[
              ['Simbolo', 'Tipo', 'Lotes', 'PrecioOpen', 'FechaOpen', 'FechaClose', 'PrecioClose', 'TP', 'SL', 'Profit'],
              [9, 2, 3, 5, 2, 5, 3, 2, 3, 5],
            ]}
            operationsClose={[
              ['Simbolo', 'Tipo', 'Lotes', 'PrecioOpen', 'FechaOpen', 'FechaClose', 'PrecioClose', 'TP', 'SL', 'Profit'],
              [9, 2, 3, 5, 2, 5, 3, 2, 3, 5],
            ]}
          />
        ))}
      </div>
      <MenuFooter />
    </div>
  );
}

export default Accounts;

import React, { useEffect, useState, useRef } from 'react';
import '../routes.css';
import MenuFooter from '../Components/MenuFooter';
import AccountDetail from '../Components/AccountDetail';
import { getAccountNames, getAccountIds, getDetailBalance } from '../Api';

function Accounts() {
  const [accountNames, setAccountNames] = useState([]);
  const [accountIds, setAccountIds] = useState([]);
  const [accountDetails, setAccountDetails] = useState({});
  const lastFetchTime = useRef(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const names = await getAccountNames();
        setAccountNames(names);

        const ids = await getAccountIds();
        setAccountIds(ids);

        const currentTime = Date.now();
        if (currentTime - lastFetchTime.current > 900000) {
          // Si han pasado al menos 5 minutos desde la última solicitud
          lastFetchTime.current = currentTime;

          const detailsPromises = ids.map(async (accountId) => {
            try {
              const detailBalance = await getDetailBalance(accountId);
              return { [accountId]: detailBalance };
            } catch (error) {
              console.error(`Error fetching account details for ${accountId}:`, error);
              setAccountDetails(prevDetails => ({ ...prevDetails, [accountId]: { error: true } }));
              return { [accountId]: {} };
            }
          });
          
          const details = await Promise.all(detailsPromises);
          const detailsObject = Object.assign({}, ...details);
          setAccountDetails(detailsObject);

        } else {
          console.log('Demasiadas solicitudes en un corto período de tiempo. Se omitió la solicitud.');
        }

      } catch (error) {
        console.error('Error al obtener los datos de las cuentas:', error);
      }
    }

    fetchData();
  }, [accountIds]);

  const getResumeTableData = (accountId) => {
    const { balance, flotante } = accountDetails[accountId] || {};
    return [
      ['Balance', 'Flotante', '%Flotante-Balance'],
      [balance || 0, flotante || 0, (flotante && balance) ? ((flotante / balance) * 100).toFixed(2) + '%' : '0%'],
    ];
  };

  const getTableData = (accountId) => {
    const { balance, equity, flotante, operations } = accountDetails[accountId] || {};
    return [
      { label: 'Balance', value: balance ? balance.toFixed(2).toLocaleString() : 'N/A' },
      { label: 'Equidad', value: equity ? equity.toFixed(2).toLocaleString() : 'N/A' },
      { label: 'Flotante', value: flotante ? flotante.toFixed(2).toLocaleString() : 'N/A' },
      { label: 'Ganancia Día', value: 'N/A' },
      { label: 'Num Operaciones', value: operations },
    ];
  };

  return (
    <div>
      <div className="container">
        <h1>Cuentas</h1>
        {accountIds.map((accountId, index) => {
          const currentAccountName = accountNames[index];
          console.log('Account ID:', accountId, 'Account Name:', currentAccountName);
          return (
            <AccountDetail
              key={currentAccountName}
              accountName={currentAccountName}
              resumeTable={getResumeTableData(accountId)}
              tableData={getTableData(accountId)}
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
          );
        })}
      </div>
      <MenuFooter />
    </div>
  );
  
}

export default Accounts;

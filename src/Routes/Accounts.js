import React, { useEffect, useState, useRef } from 'react';
import '../routes.css';
import MenuFooter from '../Components/MenuFooter';
import AccountDetail from '../Components/AccountDetail';
import { getAccountNames, getAccountIds, getDetailBalance, getCountOperations, getOpenOperations, getCloseOperations } from '../Api';

function Accounts() {
  const [accountNames, setAccountNames] = useState([]);
  const [accountIds, setAccountIds] = useState([]);
  const [accountDetails, setAccountDetails] = useState({});
  const lastFetchTime = useRef(0);
  const [openOperationsCount, setOpenOperationsCount] = useState({});
  const [openOperations, setOpenOperations] = useState({});
  const [closeOperations, setCloseOperations] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const names = await getAccountNames();
        setAccountNames(names);

        const ids = await getAccountIds();
        setAccountIds(ids);

        const countData = await getCountOperations();
        setOpenOperationsCount(countData);

        const currentTime = Date.now();
        if (currentTime - lastFetchTime.current > 90000) {
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

        //OPERACIONES ABIERTAS 
        const openOpsPromises = accountIds.map(async (accountId) => {
          try {
            const openOps = await getOpenOperations(accountId);
            return { [accountId]: openOps };
          } catch (error) {
            console.error(`Error fetching open operations for ${accountId}:`, error);
            return { [accountId]: [] };
          }
        });

        const openOps = await Promise.all(openOpsPromises);
        const openOpsObject = Object.assign({}, ...openOps);
        setOpenOperations(openOpsObject); 

        //OPERACIONES CERRADAS 
        const closeOpsPromises = accountIds.map(async (accountId) => {
          try {
            const closeOps = await getCloseOperations(accountId);
            return { [accountId]: closeOps };
          } catch (error) {
            console.error(`Error fetching close operations for ${accountId}:`, error);
            return { [accountId]: [] };
          }
        });

        const closeOps = await Promise.all(closeOpsPromises);
        const closeOpsObject = Object.assign({}, ...closeOps);
        setCloseOperations(closeOpsObject);

      } catch (error) {
        console.error('Error al obtener los datos de las cuentas:', error);
      }
    }

    fetchData();
  }, [accountIds]);

  const getResumeTableData = (accountId) => {
    const { balance, flotante } = accountDetails[accountId] || {};
    const balanceClass = balance && balance > 70 ? 'blue-text' : balance && balance < 70 ? 'red-text' : '';
    const flotanteClass = flotante && flotante > 70 ? 'blue-text' : flotante && flotante < 70 ? 'red-text' : '';
    /* return [
      //['Balance', 'Flotante', '%Flotante-Balance'],
      [balance || 0, flotante || 0, (flotante && balance) ? ((flotante / balance) * 100).toFixed(2) + '%' : '0%'],
    ]; */
    const formattedBalance = balance ? balance.toLocaleString('es-ES') : 0;
    const formattedFlotante = flotante ? flotante.toLocaleString('es-ES') : 0;

    return [
      [
        <span className={balanceClass}>{formattedBalance}</span>,
        <span className={flotanteClass}>{formattedFlotante}</span>,
        (flotante && balance) ? ((flotante / balance) * 100).toFixed(2) + '%' : '0%',
      ],
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
          const symbolCounts = openOperationsCount || {};
          const operations = openOperations[accountId] || [];
          const operationsClose = closeOperations[accountId] || []; 
          console.log('Datos Account')
          return (
            <AccountDetail
              key={currentAccountName}
              accountName={currentAccountName}
              resumeTable={getResumeTableData(accountId)}
              tableData={getTableData(accountId)}
              colaData={[
                ['GBPAUD', 'GBPUSD', 'AUDCAD', 'AUDUSD', 'USDJPY'],
                [symbolCounts['GBPAUD'] || '-', symbolCounts['GBPUSD'] || '-', symbolCounts['AUDCAD'] || '-', symbolCounts['AUDUSD'] || '-', symbolCounts['USDJPY'] || '-'],
              ]}
              operationsOpen={[
                ['Simbolo', 'Tipo', 'Lotes', 'PrecioOpen', 'FechaOpen', 'FechaClose', 'PrecioClose', 'TP', 'SL', 'Profit'],
                ...(operations.length ? operations.map(op => Object.values(op)) : [Array(10).fill('-')]),
              ]}
              operationsClose={[
                ['Simbolo', 'Tipo', 'Lotes', 'PrecioOpen', 'FechaOpen', 'FechaClose', 'PrecioClose', 'TP', 'SL', 'Profit'],
                ...(operationsClose.length > 0
                  ? operationsClose.map(op =>
                      op && Object.values(op).length ? Object.values(op) : Array(10).fill('-')
                    )
                  : [Array(10).fill('-')]
                ),
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

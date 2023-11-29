import React, { useEffect, useState, useRef } from 'react';
import '../routes.css';
import MenuFooter from '../Components/MenuFooter';
import AccountDetail from '../Components/AccountDetail';
import { getAccountNames, getAccountIds, getDetailBalance, getOpenOperations, getCloseOperations, getDetailBalanceDay, getCountOperations, getPairsById } from '../Api';

function Accounts() {
  const [accountNames, setAccountNames] = useState([]);
  const [accountIds, setAccountIds] = useState([]);
  const [accountDetails, setAccountDetails] = useState({});
  const [accountDetailsDay, setAccountDetailsDay] = useState({});
  const lastFetchTime = useRef(0);
  const [openOperations, setOpenOperations] = useState({});
  const [closeOperations, setCloseOperations] = useState({});
  const [countOperations, setCountOperations] = useState({});
  const [pairNames, setPairNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const names = await getAccountNames();
        setAccountNames(names);
  
        const ids = await getAccountIds();
        setAccountIds(ids);
  
        const currentTime = Date.now();
        if (currentTime - lastFetchTime.current > 90000) {
          lastFetchTime.current = currentTime;
  
          for (const accountId of ids) {
            try {
              const detailBalance = await getDetailBalance(accountId);
              const detailBalanceDay = await getDetailBalanceDay(accountId);
              const openOps = await getOpenOperations(accountId);
              const closeOps = await getCloseOperations(accountId);
              const countOps = await getCountOperations(accountId);
  
              setAccountDetails(prevDetails => ({
                ...prevDetails,
                [accountId]: detailBalance,
              }));
  
              setAccountDetailsDay(prevDetailsDay => ({
                ...prevDetailsDay,
                [accountId]: detailBalanceDay,
              }));
  
              setOpenOperations(prevOpenOps => ({
                ...prevOpenOps,
                [accountId]: openOps,
              }));
  
              setCloseOperations(prevCloseOps => ({
                ...prevCloseOps,
                [accountId]: closeOps,
              }));
  
              setCountOperations(prevCountOps => ({
                ...prevCountOps,
                [accountId]: countOps,
              }));
            } catch (error) {
              console.error(`Error fetching data for account ${accountId}:`, error);
            }
          }
        } else {
          console.log('Demasiadas solicitudes en un corto período de tiempo. Se omitió la solicitud.');
        }
      } catch (error) {
        console.error('Error al obtener los datos de las cuentas:', error);
      }
    }
  
    fetchData();
    fetchPairNames();
  }, []);
  

  const getResumeTableData = (accountId) => {
    const { balance, flotante } = accountDetails[accountId] || {};
    const balanceClass = balance && balance > 70 ? 'blue-text' : balance && balance < 70 ? 'red-text' : '';
    const flotanteClass = flotante && flotante > 70 ? 'blue-text' : flotante && flotante < 70 ? 'red-text' : '';
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

  const getTableData = (accountId, gain) => {
    const { balance, equity, flotante, operations } = accountDetails[accountId] || {};
    return [
      { label: 'Balance', value: balance ? balance.toFixed(2).toLocaleString() : '0' },
      { label: 'Equidad', value: equity ? equity.toFixed(2).toLocaleString() : '0' },
      { label: 'Flotante', value: flotante ? flotante.toFixed(2).toLocaleString() : '0' },
      { label: 'Ganancia Día', value: gain ? gain.toFixed(2) : '0' },
      { label: 'Num Operaciones', value: operations },
    ];
  };

  const fetchPairNames = async () => {
    try {
      const pairIds = Array.from({ length: 8 }, (_, i) => i + 1);
      const pairsData = await Promise.all(pairIds.map(async (id) => {
        const pairDataArray = await getPairsById(id);
        const pairName = pairDataArray.length > 0 ? pairDataArray[0].pares : 'N/A';
        return pairName;
      }));
      setPairNames(pairsData);
    } catch (error) {
      console.error('Error fetching pair names:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Cuentas</h1>
        {accountIds.map((accountId, index) => {
          const currentAccountName = accountNames[index];
          const gain = accountDetailsDay[accountId];
          const operations = openOperations[accountId] || [];
          const operationsClose = closeOperations[accountId] || []; 
          const countOperationsTable = countOperations[accountId] || []; 
          const pairData = {};

          // Iterar sobre countOperationsTable para organizar los datos por símbolo
          countOperationsTable.forEach(data => {
            pairData[data.symbol] = data.open_operations;
          });

          const pairOperations = pairNames.map(pair => pairData[pair] || '-');
          return (
            <AccountDetail
              key={currentAccountName}
              accountName={currentAccountName}
              resumeTable={getResumeTableData(accountId)}
              tableData={getTableData(accountId, gain)}
              colaData={[
                pairNames,
                pairOperations,
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

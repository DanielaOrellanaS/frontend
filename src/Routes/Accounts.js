import React, { useEffect, useState, useMemo } from 'react';
import '../routes.css';
import MenuFooter from '../Components/MenuFooter';
import AccountDetail from '../Components/AccountDetail';
import { getAccountInfo, getDetailBalance, getDetailBalanceDay, getOpenOperations, getCloseOperations, getCountOperations, getPairsById } from '../Api';

function Accounts() {
  const [accountNames, setAccountNames] = useState([]);
  const [accountIds, setAccountIds] = useState([]);
  const [accountDetails, setAccountDetails] = useState({});
  const [openOperations, setOpenOperations] = useState({});
  const [closeOperations, setCloseOperations] = useState({});
  const [countOperations, setCountOperations] = useState({});
  const [pairNames, setPairNames] = useState([]);
  const [gainDay, setGainDay] = useState({});
  
  async function fetchData() {
    try {
      const { accountNames, accountIds } = await getAccountInfo();
      setAccountNames(accountNames);
      setAccountIds(accountIds);
      for (const accountId of accountIds) {
        try {
          const detailBalance = await getDetailBalance(accountId);
          const openOps = await getOpenOperations(accountId);
          const closeOps = await getCloseOperations(accountId);
          const countOps = await getCountOperations(accountId);

          setAccountDetails(prevDetails => ({
            ...prevDetails,
            [accountId]: detailBalance,
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

          const gain = await getDetailBalanceDay(accountId);
          setGainDay(prevGain => ({
            ...prevGain,
            [accountId]: gain.toFixed(2),
          }));
        } catch (error) {
          console.error(`Error al obtener los datos de las cuentas ${accountId}:`, error);
        }
      }
    } catch (error) {
      console.error('Error al obtener los datos de las cuentas:', error);
    }
  } 
    
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
      fetchPairNames();
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getResumeTableData = useMemo((accountId) => {
    return (accountId) => {
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
  }, [accountDetails]);

  const getTableData = useMemo((accountId) => {
    return (accountId) => {
      const { balance, equity, flotante, operations } = accountDetails[accountId] || {};
      return [
        { label: 'Balance', value: balance ? balance.toFixed(2).toLocaleString() : '0' },
        { label: 'Equidad', value: equity ? equity.toFixed(2).toLocaleString() : '0' },
        { label: 'Flotante', value: flotante ? flotante.toFixed(2).toLocaleString() : '0' },
        { label: 'Ganancia Día', value: gainDay[accountId] || '0' },
        { label: 'Num Operaciones', value: operations },
      ];
    };
  }, [accountDetails, gainDay]);

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
          const operations = openOperations[accountId] || [];
          const operationsClose = closeOperations[accountId] || []; 
          const countOperationsTable = countOperations[accountId] || []; 
          const pairData = {};
          countOperationsTable.forEach(data => {
            pairData[data.symbol] = data.open_operations;
          });
          const pairOperations = pairNames.map(pair => pairData[pair] || '-');

          return (
            <AccountDetail
              key={currentAccountName}
              accountName={currentAccountName}
              resumeTable={getResumeTableData(accountId)}
              tableData={getTableData(accountId)}
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

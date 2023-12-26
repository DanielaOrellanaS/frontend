import React, { useCallback, useEffect, useState } from 'react';
import MenuFooter from '../Components/MenuFooter';
import { getAllDetailBalancePerUser, getUserFavAccounts } from '../Api';
import AccountDetail from '../Components/AccountDetail';

function Accounts() {
  const [details, setDetails] = useState([]);
  const username = localStorage.getItem('username');

  const fetchData = useCallback(async () => {
    try {
      const list = await getUserFavAccounts(username);
      const userAccounts = list[0];

      if (userAccounts && userAccounts.accounts) {
        const accounts = userAccounts.accounts;
        const parsedAccounts = accounts.substring(1, accounts.length - 1).split(',').map(Number);
        const detailsData = await getAllDetailBalancePerUser(parsedAccounts);
        setDetails(detailsData);
      } else {
        console.error('No se encontraron cuentas para este usuario');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [username]);

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  const getColorClass = value => {
    if (value < 70) {
      return 'red-text';
    } else if (value > 70) {
      return 'blue-text';
    } else {
      return 'white-text';
    }
  };

  return (
    <div>
      <h1>Cuentas</h1>
      <div>
        {details.map((detail, index) => (
          <AccountDetail
            key={`${detail.id}-${index}`}
            accountName={detail.alias}
            accountId={detail.id}
            balance={detail.balance}
            flotante={detail.flotante}
            percentage={detail.percentage}
            equity={detail.equity}
            gain={detail.gain}
            numOperations={detail.num_operations}
            colas={detail.colas}
            openOperations={detail.open_operations || []}
            closedOperations={detail.closed_operations || []}
            getColorClass={getColorClass}
          />
        ))}
      </div>
      <div className="space"></div>
      <MenuFooter />
    </div>
  );
}

export default Accounts;

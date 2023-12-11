import React, { useEffect, useState } from 'react';
import MenuFooter from '../Components/MenuFooter';
import { getAllDetailBalance } from '../Api';
import AccountDetail from '../Components/AccountDetail';

function Accounts() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getAllDetailBalance()
      .then(data => {
        setDetails(data); 
      })
      .catch(error => {
        console.error('Error fetching account balance details:', error);
      });
  }, []);

  return (
    <div>
      <h1>Cuentas</h1>
      <div>
        {details.map(detail => (
          <AccountDetail
            key={detail.id}
            accountName={detail.alias}
            balance={detail.balance}
            flotante={detail.flotante}
            percentage={detail.percentage}
            equity={detail.equity}
            gain={detail.gain}
            numOperations={detail.num_operations}
            openOperations={detail.open_operations || []}
            closedOperations={detail.closed_operations || []}
          />
        ))}
      </div>
      <MenuFooter />
    </div>
  );
}

export default Accounts;

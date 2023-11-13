const apiUrl = 'https://tradinapi.azurewebsites.net';

async function getCsrfToken() {
  try {
    const response = await fetch(`${apiUrl}/get-csrf-token/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    throw error;
  }
}

async function login(username, password, csrfToken) {
  try {
    const response = await fetch(`${apiUrl}/authapi/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Failed to log in');
    }
    const data = await response.json();
    return data.key;
  } catch (error) {
    throw error;
  }
}

async function createAccount(username, password, email) {
    try {
      const response = await fetch(`${apiUrl}/auth/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
      if (!response.ok) {
        throw new Error('Failed to create an account');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      throw error;
    }
  }

  async function getAccountNames() {
    try {
      const response = await fetch(`${apiUrl}/cuenta/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch account names');
      }
      const data = await response.json();
      const accountNames = data.results.map((account) => account.alias);
      return accountNames;
    } catch (error) {
      throw error;
    }
  }  

  async function getAccountIds() {
  try {
    const response = await fetch(`${apiUrl}/cuenta/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch account IDs');
    }
    const data = await response.json();
    const accountIds = data.results.map((account) => account.id);
    return accountIds;
  } catch (error) {
    throw error;
  }
}

async function getDetailBalance(accountId) {
  try {
    const csrfToken = await getCsrfToken(); 
    const response = await fetch(`${apiUrl}/detallebalance/?account_id=${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch account balance details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export { getCsrfToken, login, createAccount, getAccountNames, getAccountIds, getDetailBalance};

const apiUrl = 'https://tradinapi.azurewebsites.net';
const localUrl = 'http://127.0.0.1:8000';  

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

  async function getAccountInfo() {
    try {
      const response = await fetch(`${apiUrl}/cuenta/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch account information');
      }
  
      const data = await response.json();
  
      const accountNames = data.results.map((account) => account.alias);
      const accountIds = data.results.map((account) => account.id);
  
      return { accountNames, accountIds };
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

async function getAllDetailBalance() {
  try {
    const csrfToken = await getCsrfToken(); 
    const response = await fetch(`${apiUrl}/detallecompleto/`, {
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

async function getAllDetailBalancePerUser(accountsList) {
  try {
    const csrfToken = await getCsrfToken(); 
    const queryParams = accountsList.join(',');
    const response = await fetch(`${apiUrl}/detallecompleto/?accounts=${queryParams}`, {
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

async function getOperations(accountId) {
  try {
    const csrfToken = await getCsrfToken(); 
    const response = await fetch(`${apiUrl}/operaciones/?account_id=${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch account operations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function getLastIndicators() {
  try {
    const response = await fetch(`${apiUrl}/last_indicator/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch last indicators');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function getUserFavAccounts(username) {
  try {
    const response = await fetch(`${apiUrl}/cuentafavorita/?user=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user favorite accounts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function getPairs() {
  try {
    const response = await fetch(`${apiUrl}/par/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch pairs by ID');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function getEvents(fechas = []) {
  try {
    let url = `${apiUrl}/eventos/`;

    if (!Array.isArray(fechas)) {
      fechas = [fechas];
    }

    if (fechas.length > 0) {
      const formattedFechas = fechas.map((fecha) => `fecha=${fecha}`).join('&');
      url = `${apiUrl}/eventos/?${formattedFechas}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export { getCsrfToken, login, createAccount, getAccountInfo, getUserFavAccounts, getDetailBalance, getAllDetailBalance, getOperations, getLastIndicators, getPairs, getEvents, getAllDetailBalancePerUser};


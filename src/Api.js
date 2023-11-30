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

async function getDetailBalanceDay(accountId) {
  try {
    const csrfToken = await getCsrfToken(); 
    const response = await fetch(`${apiUrl}/detallebalancedia/?account_id=${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch account balance details');
    }

    const { current_balance, previous_closing_balance } = await response.json();

    if (typeof current_balance === 'number' && typeof previous_closing_balance === 'number') {
      const difference = current_balance - previous_closing_balance;
      return parseFloat(difference.toFixed(2));
    } else {
      throw new Error('Invalid balance data');
    }
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

async function getCountOperations(accountId) {
  try {
    const response = await fetch(`${apiUrl}/numoperaciones/`);
    if (!response.ok) {
      throw new Error('Failed to fetch operations count');
    }
    
    const data = await response.json();
    return data[accountId] || [];
  } catch (error) {
    throw error;
  }
}

async function getOpenOperations(accountId) {
  try {
    const csrfToken = await getCsrfToken();
    const response = await fetch(`${apiUrl}/operacionesabiertas/?account_id=${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch open operations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}


async function getCloseOperations(accountId) {
  try {
    const csrfToken = await getCsrfToken();
    const response = await fetch(`${apiUrl}/operacionescerradas/?account_id=${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch close operations');
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

async function getPairsById(id) {
  try {
    const response = await fetch(`${apiUrl}/par/?id=${id}`, {
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

async function getEvents() {
  try {
    const response = await fetch(`${apiUrl}/eventos/`, {
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

async function getEventsPerDay(fechas = []) {
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


export { getCsrfToken, login, createAccount, getAccountNames, getAccountIds, getDetailBalance, getDetailBalanceDay, getOperations, getCountOperations, getOpenOperations, getCloseOperations, getLastIndicators, getPairsById, getEvents, getEventsPerDay};


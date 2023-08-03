import { addLoadingBar, removeLoadingBar } from '/components/LoadingBar.js';

async function get(endpoint, params = '', isLoading = false) {
  const apiUrl = `${endpoint}${params}`;
  try {
    if (isLoading) addLoadingBar();
    const res = await fetch(apiUrl);

    const result = await res.json();

    if (!res.ok) {
      const { message } = result;

      throw new Error(message);
    }
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (isLoading) removeLoadingBar();
  }
}

async function post(endpoint, data = {}, isForm = false, isLoading = false) {
  try {
    if (isLoading) addLoadingBar();
    const apiUrl = endpoint;
    const bodyData = isForm ? data : JSON.stringify(data);

    let headers = {};
    if (!isForm) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: bodyData,
    });

    const result = await res.json();

    if (!res.ok) {
      const { message } = result;

      throw new Error(message);
    }
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (isLoading) removeLoadingBar();
  }
}

async function patch(endpoint, params = '', data = {}, isLoading = false) {
  try {
    if (isLoading) addLoadingBar();
    const apiUrl = `${endpoint}${params}`;
    const bodyData = JSON.stringify(data);

    const res = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyData,
    });

    const result = await res.json();

    if (!res.ok) {
      const { message } = result;

      throw new Error(message);
    }

    return result;
  } catch (err) {
    throw err;
  } finally {
    if (isLoading) removeLoadingBar();
  }
}

async function put(endpoint, params = '', data = {}, isLoading = false) {
  try {
    const apiUrl = `${endpoint}${params}`;
    const bodyData = JSON.stringify(data);

    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyData,
    });

    const result = await res.json();

    if (!res.ok) {
      const { message } = result;

      throw new Error(message);
    }

    return result;
  } catch (err) {
    throw err;
  } finally {
    if (isLoading) removeLoadingBar();
  }
}

async function del(endpoint, params = '', data = {}, isLoading = false) {
  try {
    const apiUrl = `${endpoint}${params}`;
    const bodyData = JSON.stringify(data);

    const res = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyData,
    });

    const result = await res.json();

    if (!res.ok) {
      const { message } = result;

      throw new Error(message);
    }
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (isLoading) removeLoadingBar();
  }
}

export { get, post, patch, put, del as delete };

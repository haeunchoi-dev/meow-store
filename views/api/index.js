async function get(endpoint, params = '') {
  const apiUrl = `${endpoint}${params}`;

  const res = await fetch(apiUrl);

  const result = await res.json();

  if (!res.ok) {
    const { message } = result;

    throw new Error(message);
  }
  return result;
}

async function post(endpoint, data = {}, isForm = false) {
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
}

async function patch(endpoint, params = '', data = {}) {
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
}

async function put(endpoint, params = '', data = {}) {
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
}

async function del(endpoint, params = '', data = {}) {
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
}

export { get, post, patch, put, del as delete };

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function fetchResource ({ endpoint, method, headers, bodyObject, successStatus }) {
  return fetch(BASE_URL + endpoint, {
    method,
    headers,
    credentials: 'include',
    body: JSON.stringify(bodyObject)
  })
  .then(res => {
    if (res.status !== successStatus) {
      return Promise.reject(res.status);
    }
    return res.json();
  });
}

export function register (email, password) {
  return fetchResource({
    endpoint: '/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    bodyObject: {password, email},
    successStatus: 201
  });
}

export function login (email, password) {
  return fetchResource({
    endpoint: '/signin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    bodyObject: {password, email},
    successStatus: 200
  });
}

export function logout () {
  return fetchResource({
    endpoint: '/signout',
    method: 'POST',
    successStatus: 200
  });
}

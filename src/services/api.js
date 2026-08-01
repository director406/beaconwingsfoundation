const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

async function tryRefresh() {
  const refresh = localStorage.getItem('iiwc_refresh_token');
  if (!refresh) return false;
  try {
    const res = await fetch(`${BASE}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    localStorage.setItem('iiwc_access_token', data.access);
    return true;
  } catch {
    return false;
  }
}

async function request(method, path, body, auth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('iiwc_access_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const opts = { method, headers };
  if (body !== null && body !== undefined) opts.body = JSON.stringify(body);

  let res = await fetch(`${BASE}${path}`, opts);

  if (res.status === 401 && auth) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('iiwc_access_token')}`;
      res = await fetch(`${BASE}${path}`, { ...opts, headers });
    } else {
      localStorage.removeItem('iiwc_access_token');
      localStorage.removeItem('iiwc_refresh_token');
      localStorage.removeItem('iiwc_currentUser');
      window.dispatchEvent(new Event('storage'));
    }
  }

  return res;
}

export const api = {
  get:   (path, auth)        => request('GET',    path, null, auth ?? true),
  post:  (path, body, auth)  => request('POST',   path, body, auth ?? true),
  patch: (path, body, auth)  => request('PATCH',  path, body, auth ?? true),
  del:   (path, auth)        => request('DELETE', path, null, auth ?? true),
};

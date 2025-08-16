const API_URL = 'http://localhost:5000/api/auth'; // Cambia a tu URL backend

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Error en login');
  }

  const data = await res.json();
  // Guardar token o info en localStorage si hay
  localStorage.setItem('token', data.token);
  return data;
}

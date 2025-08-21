import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Login
export const postLogin = async (username, password) => {
  try {
    const response = await post('/usuario/login', {
      NombreUsuario: username,
      Contrasenia: password
    });
    const data = response.data
    sessionStorage.setItem('nombre', data.nombreCompleto);
    sessionStorage.setItem('usuario', data.nombreUsuario);
    sessionStorage.setItem('rol', data.rol);
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('userId', data.usuarioId);
    return { success: true };

  } catch (err) {
    if (err.response) {
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}

// Recuperar Contraseña
export const pacthForgotPassword = async (email) => {
  await put(`/usuario/recuperar/${email}`, {
    Emial: email
  })
  return true;
}

// Cierre de Sesión
export const postLogout = async () => {
  const id = sessionStorage.getItem('userId');
  if (null) await post(`/usuario/logout/${id}`)
  sessionStorage.clear();
  return true;
}

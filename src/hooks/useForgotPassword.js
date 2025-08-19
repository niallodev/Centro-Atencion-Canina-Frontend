import { useState } from 'react';
import { pacthForgotPassword } from '../services/authService';
const TIEMPO_ERROR = import.meta.env.VITE_TIEMPO_ERROR;

export const useForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      setError('El correo es obligatorio');
      return;
    }
    try {
      // Simular llamada a API
      // await forgotPassword(email); <-- Esto sería tu función real
      const forgotPassword = await pacthForgotPassword(email);
      console.log(forgotPassword);
      if(forgotPassword) {setMessage('Si tu correo está registrado, recibirás instrucciones para recuperar tu contraseña.')};
      setEmail('');
    } catch (err) {
      setError('Ocurrió un error al procesar la solicitud');
    }
    setTimeout(()=> {
      setMessage(null);
      setError(null);
    }, TIEMPO_ERROR)
  };

  return {
    email,
    message,
    error,
    setEmail,
    handleSubmit,
  };
};

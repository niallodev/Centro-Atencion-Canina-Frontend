import { useState } from 'react';
import { login } from '../services/authService';

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      alert("Login exitoso");
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  return {
    username,
    password,
    remember,
    error,
    setUsername,
    setPassword,
    setRemember,
    handleSubmit,
  };
};

import { useState } from 'react';
import { postLogin, postLogout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
const TIEMPO_ERROR = import.meta.env.VITE_TIEMPO_ERROR;


export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <- 1. Inicializar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
      const login = await postLogin(username, password);
      console.log(login);
      if (!login.success) {
        setError(login.message);
      }else{
        navigate("/dashboard")
      }
      setTimeout(()=> {
        setError(null);
      }, TIEMPO_ERROR)
  };

  return {
    username,
    password,
    error,
    setUsername,
    setPassword,
    handleSubmit,
  };
};

export const useLogout = () => {
  const navigate = useNavigate(); // <- 1. Inicializar
  const handleSubmit = async (e) => {
    e.preventDefault();
      const logout = await postLogout();
      console.log(logout);
      navigate("/login")
  };
  return { handleSubmit }
}


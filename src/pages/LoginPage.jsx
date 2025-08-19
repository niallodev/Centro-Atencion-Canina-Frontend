import {Login, ForgotPassword} from '../features/features';
import {useState} from 'react';
import '../styles/pages/LoginPage.css'

export default function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  return (
    <div className='LoginPage'>
      {showForgotPassword ? (
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      ):(
        <Login onForgotPassword={() => setShowForgotPassword(true)} />
      )}    
    </div>
  );
}


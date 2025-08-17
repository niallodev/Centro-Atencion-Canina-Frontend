// import { useState } from 'react';
// import { login } from '../../services/authService';
import '../../styles/Login.css';
import {ButtonField, InputField} from '../../components/components.js'
import { useLogin } from '../../hooks/hooks.js';

export default function Login() {
    const { username, password, remember, setUsername, 
    setPassword, setRemember, handleSubmit, error, } = useLogin();
  
  return (
    <div className='LoginContainer'>
        <form className='LoginForm' onSubmit={handleSubmit}>
            <h2 className='LoginTitle'>Login</h2>
            <InputField type={'text'} placeholder={'Username'} value={username} onChange={(e) => {setUsername}} className='LoginInput' required={true}/>
            <InputField type={'password'} placeholder={'Password'} value={password} onChange={(e) => {setPassword}} className='LoginInput' required={true}/>
            <div className='LoginOptions'>
                <label className='LoginLabel'>
                    <InputField type={'checkbox'} onChange={(e) => {setRemember}} value={remember} className='LoginInput' required={false}/>
                    Remember me
                </label>
                <a href="#" className='LoginLink'>
                    Forgot password?
                </a>
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ButtonField type={"submit"} className={"LoginButton"}/>

            <p className='LoginParrafo'>
                Don't have an account?{" "}
            <a href="#" className='LoginLink'>
                Register
            </a>
         </p>
        </form>
    </div>
    
  );
}
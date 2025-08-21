import '../../styles/feactures/Login.css';
import { ButtonField, InputField, LinkButtonField } from '../../components/components.js'
import { useLogin } from '../../hooks/hooks.js';

export default function Login({ onForgotPassword }) {
    const { username, password, setUsername,
        setPassword, handleSubmit, error, } = useLogin();

    return (
        <div className='LoginContainer'>
            <form className='LoginForm' onSubmit={handleSubmit}>
                <h2 className='LoginTitle'>Inicio de Sesión</h2>
                <InputField type={'text'} placeholder={'Username'} name={"username"} value={username} onChange={e => { setUsername(e.target.value) }} className='LoginInput' required={true} />
                <InputField type={'password'} placeholder={'Password'} value={password} onChange={e => { setPassword(e.target.value) }} className='LoginInput' required={true} />
                <div className='LoginPageOptions'>
                    <label className='LoginPageLabel'>
                        Recuérdame
                        <LinkButtonField type={'button'} className={'LoginLinkButton'} onClick={onForgotPassword} text={'¿Olvidaste tu contraseña?'} />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ButtonField type={"submit"} className={"LoginButton"} text={'Iniciar Sesión'} />

            </form>
        </div>

    );
}
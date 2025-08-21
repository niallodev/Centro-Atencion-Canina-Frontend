import '../../styles/feactures/ForgotPassword.css';
import { ButtonField, InputField, LinkButtonField } from '../../components/components.js'
import { useForgotPassword } from '../../hooks/hooks.js';

export default function ForgorPassword({ onBack }) {
    const { email, message, error,
        setEmail, handleSubmit, } = useForgotPassword();
    return (
        <div className="LoginContainer">
            <form className="LoginForm" onSubmit={handleSubmit}>
                <h2 className="LoginTitle">Recuperar Contraseña</h2>

                <InputField
                    type="email" name="email"
                    placeholder="Ingresa tu correo electrónico" value={email}
                    onChange={(e) => setEmail(e.target.value)} className="ForgotPasswordInput" required={true}
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}

                <ButtonField type="submit" className="LoginButton" text={'Recuperar Contraseña'} />
                <div className='LoginPageOptions'>
                    <label className='LoginPageLabel'>
                        ¿Ya tienes una cuenta?
                        <LinkButtonField type={'button'} className={'ForgotPasswordLinkButton'} onClick={onBack} text={'Inicia sesión'} />
                    </label>
                </div>

            </form>
        </div>
    );
}
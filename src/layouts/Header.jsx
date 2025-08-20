import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/layouts/Header.css';
import {useLogout} from '../hooks/useLogin'
import perfil from '../assets/profile.jpg'; // Reemplaza con tu ruta de imagen real
import {LinkButtonField} from '../components/components'

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const {handleSubmit} = useLogout();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
    console.log(menuAbierto);
  };

  return (
    <nav className="HeaderNav">
      <Link className="HeaderLogo" to={"/dashboard"}>Centro de Atención Canino</Link>

      {/* Botón hamburguesa */}
      <div className="Hamburger" onClick={toggleMenu}>
        ☰ 
      </div>
      
      
       {/* Menú principal */}
      <ul className={`HeaderMenu ${menuAbierto ? 'abierto' : ''}`}>
        <li><Link to="/owner">Dueños</Link></li>
        <li><a href="#">Mascotas</a></li>
        <li><a href="#">Citas</a></li>
        <li>
          <a href="#">Servicios</a>
          <ul className="HeaderSubMenu">
            <li><a href="#">Baños normales</a></li>
            <li><a href="#">Baños medicados</a></li>
            <li><a href="#">Peluquería</a></li>
            <li><a href="#">Desparasitación</a></li>
          </ul>
        </li>
      </ul>
      {/* Perfil */}
      <div className="HeaderProfile">
        <img src={perfil} alt="Perfil" className="ProfileImage" />
        <ul className="ProfileSubMenu">
          <li><a href="#">Cambiar contraseña</a></li>
          <hr />
          <button className='HeaderCierre' onClick={handleSubmit}>Cerrar sesión</button>
        </ul>
      </div>
    </nav>
  );
}

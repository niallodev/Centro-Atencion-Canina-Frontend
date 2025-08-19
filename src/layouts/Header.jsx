import { useState } from 'react';
import '../styles/layouts/Header.css';
import {useLogout} from '../hooks/useLogin'
import perfil from '../assets/profile.jpg'; // Reemplaza con tu ruta de imagen real

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const {handleSubmit} = useLogout();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
    console.log(menuAbierto);
  };

  return (
    <nav className="HeaderNav">
      <div className="HeaderLogo">Centro de Atención Canino</div>

      {/* Botón hamburguesa */}
      <div className="Hamburger" onClick={toggleMenu}>
        ☰ 
      </div>
      
      
       {/* Menú principal */}
      <ul className={`HeaderMenu ${menuAbierto ? 'abierto' : ''}`}>
        <li><a href="#">Dueños</a></li>
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
          <li><a href="#">Cerrar sesión</a></li>
          <button onClick={handleSubmit}>Hola</button>
        </ul>
      </div>
    </nav>
  );
}

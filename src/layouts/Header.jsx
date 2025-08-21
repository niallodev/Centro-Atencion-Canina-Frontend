import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/layouts/Header.css';
import { useLogout } from '../hooks/useLogin'
import perfil from '../assets/profile.jpg'; // Reemplaza con tu ruta de imagen real

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const { handleSubmit } = useLogout();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
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
        <li><Link to="/pet">Mascotas</Link></li>
        <li><Link to="/quote">Citas</Link></li>
        <li>
          <a href="#">Servicios</a>
          <ul className="HeaderSubMenu">
            <li><Link to="/service/normalbathrooms">Baños normales</Link></li>
            <li><Link to="/service/medicatedtoilets">Baños medicados</Link></li>
            <li><Link to="/service/hairsalon">Peluquería</Link></li>
            <li><Link to="/service/deworming">Desparasitación</Link></li>
          </ul>
        </li>
      </ul>
      {/* Perfil */}
      <div className="HeaderProfile">
        <img src={perfil} alt="Perfil" className="ProfileImage" />
        <ul className="ProfileSubMenu">
          <button className='HeaderCierre' onClick={handleSubmit}>Cerrar sesión</button>
        </ul>
      </div>
    </nav>
  );
}

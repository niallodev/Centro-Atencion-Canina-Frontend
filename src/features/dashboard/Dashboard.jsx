import { Card, Weeklycalendar } from '../../components/components';
import { useDashboard } from '../../hooks/hooks'
import '../../styles/feactures/Dashboard.css';

export default function Dashboard() {
  const { cantidadMascotas, citas, citasProgramadas } = useDashboard();

  return (
    <div className="DashboardContainer">
      <h1 className='DashboardTitle'>Bienvenido al Centro de Atención Canina</h1>
      <div className="DashboardStats">
        <Card title={'Mascotas Registradas'} text={cantidadMascotas}/>
        <Card title={'Citas Pendientes'} text={citas.pendientes}/>
        <Card title={'Citas Completas'} text={citas.realizadas}/>
        <Card title={'Citas Cancelada'} text={citas.canceladas}/>
      </div>

      <Weeklycalendar citasProgramadas={citasProgramadas}></Weeklycalendar>
      <br />
    </div>
  );
}

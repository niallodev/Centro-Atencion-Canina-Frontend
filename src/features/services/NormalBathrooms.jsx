import { useQuotes } from '../../hooks/hooks'
import { BasicTable } from '../../components/components'
import '../../styles/feactures/Services.css'

export default function NormalBathrooms() {
    const { citas } = useQuotes(1);
    return (<>
        <div className="ServicesContainer">
            <div className="ServicesHeader">
                <h2>Baños Normales</h2>
            </div>
            <div className="ServicesTableWrapper">
                <BasicTable
                    items={citas}
                    columns={[
                        { key: 'nombreMascota', label: 'Mascota' },
                        { key: 'nombreServicio', label: 'Servicio' },
                        { key: 'fechaHora', label: 'Fecha y Hora' },
                        { key: 'nombreProfesional', label: 'Profesional' },
                        { key: 'motivo', label: 'Motivo' },
                    ]}

                />
            </div>
        </div>
    </>);
}

import { useQuotes } from '../../hooks/hooks'
import { InputField, SelectField, ButtonField, BasicTable } from '../../components/components'
import { estadosCitas } from '../../config/const/const'
import { formatDateHourToInput } from '../../utils/utils'
import '../../styles/feactures/Quotes.css'

export default function Quotes() {
    const { citas, modalVisible, modalTipo, citaActual, selectMascotas, selectServicios, selectUsuarios,
        setCitaActual, abrirModal, cerrarModal, handleSubmit, handleEliminarConfirmado,
        filtroFecha, setFiltroFecha, filtroProfesional, setFiltroProfesional,
        filtroMascota, setFiltroMascota, citasFiltradas,
    } = useQuotes();

    return (<>
        <div className="QuotesContainer">
            <div className="QuotesHeader">
                <h2>Citas Registradas</h2>
                <ButtonField type={'button'} form={true} onclick={() => abrirModal('agregar')} className="Agregar" text={'+ Nueva Cita'} />
            </div>
            <div className="QuotesTableWrapper">
                <div className="QuotesFilter">
                    <InputField
                        type="date"
                        name="filtroFecha"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                        placeholder="Filtrar por Fecha"
                    />
                    <SelectField
                        name="filtroProfesional"
                        value={filtroProfesional}
                        options={[...selectUsuarios.map(u => ({ label: u.nombreCompleto, value: u.nombreCompleto }))]}
                        onChange={(e) => setFiltroProfesional(e.target.value)}
                        placeholder="Filtrar por Profesional"
                    />
                    <SelectField
                        name="filtroMascota"
                        value={filtroMascota}
                        options={[...selectMascotas.map(m => ({ label: m.nombreMascota, value: m.nombreMascota }))]}
                        onChange={(e) => setFiltroMascota(e.target.value)}
                        placeholder="Filtrar por Mascota"
                    />
                    </div>

                <BasicTable
                    items={citasFiltradas}
                    columns={[
                        { key: 'nombreMascota', label: 'Mascota' },
                        { key: 'nombreServicio', label: 'Servicio' },
                        { key: 'fechaHora', label: 'Fecha y Hora' },
                        { key: 'nombreProfesional', label: 'Profesional' },
                        { key: 'motivo', label: 'Motivo' },
                        { key: 'estado', label: 'Estado' },
                    ]}
                    renderActions={(mascota) => (
                        <>
                            <ButtonField type={'button'} form={true} onclick={() => abrirModal('editar', mascota)} className="Editar" text="✏️" />
                            <ButtonField type={'button'} form={true} onclick={() => abrirModal('eliminar', mascota)} className="Eliminar" text="🗑️" />
                        </>
                    )}
                />
            </div>
        </div>
        {/* MODAL */}
        {modalVisible && (
            <div className="QuotesModalBackdrop">
                <div className="QuotesModal">
                    <button className="QuotesModalCerrar" onClick={cerrarModal}>✖</button>
                    {modalTipo === 'eliminar' ? (
                        <>
                            <h3>¿Eliminar Cita?</h3>
                            <p>¿Seguro que deseas eliminar la Cita de <strong>{citaActual?.nombreMascota}</strong>?</p>
                            <ButtonField type={'button'} form={true} onclick={handleEliminarConfirmado} className="Borrar" text={'Confirmar'} />
                        </>
                    ) : (
                        <>
                            <h3>{modalTipo === 'editar' ? 'Editar Cita' : 'Nueva Cita'}</h3>
                            <form onSubmit={handleSubmit} className="QuotesForm">
                                <SelectField name={'nombreMascota'} placeholder={'Selecciona la Mascota...'} options={selectMascotas} value={citaActual?.mascotaId} onChange={e => { setCitaActual({ ...citaActual, mascotaId: e.target.value }) }} required={true} />
                                <SelectField name={'nombreServicio'} placeholder={'Selecciona el Servicio...'} options={selectServicios} value={citaActual?.servicioId} onChange={e => { setCitaActual({ ...citaActual, servicioId: e.target.value }) }} required={true} />
                                <InputField type={'datetime-local'} name="fechaHora" placeholder="Fecha de Cita" value={formatDateHourToInput(citaActual?.fechaHora)} onChange={e => { setCitaActual({ ...citaActual, fechaHora: e.target.value }) }} required={true} />
                                <SelectField name={'nombreProfesional'} placeholder={'Selecciona el Profesional...'} options={selectUsuarios} value={citaActual?.profesionalId || ''} onChange={e => { setCitaActual({ ...citaActual, profesionalId: e.target.value }) }}/>
                                <InputField type={'text'} name="motivo" placeholder="Motivo de la Cita" value={citaActual?.motivo} onChange={e => { setCitaActual({ ...citaActual, motivo: e.target.value }) }}/>
                                {modalTipo === 'editar' && <SelectField name={'estado'} placeholder={'Selecciona el Estado...'} options={estadosCitas} value={citaActual?.estado} onChange={e => { setCitaActual({ ...citaActual, estado: e.target.value }) }} required={true} />}
                                <ButtonField type={'submit'} form={true} className="Agregar" text={modalTipo === 'editar' ? 'Actualizar' : 'Guardar'} />
                            </form>
                        </>
                    )}
                </div>
            </div>
        )}
    </>);
}
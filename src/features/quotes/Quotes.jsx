import { useQuotes } from '../../hooks/hooks'
import { InputField, SelectField, ButtonField, BasicTable } from '../../components/components'
import { formatDateHourToInput } from '../../utils/utils'
import '../../styles/feactures/Quotes.css'

export default function Quotes() {
    const { citas, modalVisible, modalTipo, citaActual, selectMascotas, selectServicios, selectUsuarios, 
        setCitaActual, abrirModal, cerrarModal, handleSubmit, handleEliminarConfirmado
    } = useQuotes();

    return (<>
        <div className="QuotesContainer">
            <div className="QuotesHeader">
                <h2>Citas Registradas</h2>
                <ButtonField type={'button'} form={true} onclick={() => abrirModal('agregar')} className="Agregar" text={'+ Nueva Mascota'} />
            </div>
            {JSON.stringify(citas, 2,null)}
            <div className="QuotesTableWrapper">
                <BasicTable
                    items={citas}
                    columns={[
                        { key: 'nombreMascota', label: 'Mascota' },
                        { key: 'nombreServicio', label: 'Servicio' },
                        { key: 'fechaHora', label: 'Fecha y Hora' },
                        { key: 'nombreProfesional', label: 'Profesional' },
                        { key: 'motivo', label: 'Motivo' },
                    ]}
                    renderActions={(mascota) => (
                        <>
                        <ButtonField type={'button'} form={true} onclick={() => abrirModal('editar', mascota)} className="Editar" text="✏️"/>
                        <ButtonField type={'button'} form={true} onclick={() => abrirModal('eliminar', mascota)} className="Eliminar" text="🗑️"/>
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
                            <h3>{modalTipo === 'editar' ? 'Editar Mascota' : 'Nueva Mascota'}</h3>
                            <form onSubmit={handleSubmit} className="QuotesForm">
                                <SelectField name={'nombreMascota'} placeholder={'Selecciona la Mascota...'} options={selectMascotas} value={citaActual?.mascotaId} onChange={e => {setCitaActual({ ...citaActual, mascotaId: e.target.value })}} required={true} />
                                <SelectField name={'nombreServicio'} placeholder={'Selecciona el Servicio...'} options={selectServicios} value={citaActual?.servicioId} onChange={e => {setCitaActual({ ...citaActual, servicioId: e.target.value })}} required={true} />
                                <InputField type={'datetime-local'} name="fechaHora" placeholder="Fecha de Cita" value={formatDateHourToInput(citaActual?.fechaHora)} onChange={e => {setCitaActual({ ...citaActual, fechaHora: e.target.value })}} required={true}/>
                                <SelectField name={'nombreProfesional'} placeholder={'Selecciona el Profesional...'} options={selectUsuarios} value={citaActual?.profesionalId} onChange={e => {setCitaActual({ ...citaActual, profesionalId: e.target.value })}} required={true} />
                                <InputField type={'text'} name="motivo" placeholder="Motivo de la Cita" value={citaActual?.motivo} onChange={e => {setCitaActual({ ...citaActual, motivo: e.target.value })}} required={true}/>
                                <ButtonField type={'submit'} form={true} className="Agregar" text={modalTipo === 'editar' ? 'Actualizar' : 'Guardar'} />
                            </form>
                        </>
                    )}
                </div>
            </div>
        )}
    </>);
}
import { useOwners } from '../../hooks/hooks'
import { InputField, SelectField, ButtonField, BasicTable } from '../../components/components'
import { tipoIdentificaciones } from '../../config/const/const'
import '../../styles/feactures/Owners.css'

export default function Owners() {
    const { duenos, modalVisible, modalMascotasVisible, modalTipo, duenoActual,
        setDuenoActual, abrirModal, abrirModalMascotas, cerrarModal, cerrarModalMascotas,
        handleSubmit, handleEliminarConfirmado, mascotas
    } = useOwners();

    return (<>
        <div className="OwnersContainer">
            <div className="OwnersHeader">
                <h2>Dueños Registrados</h2>
                <ButtonField type={'button'} form={true} onclick={() => abrirModal('agregar')} className="Agregar" text={'+ Nuevo Dueño'} />
            </div>
            <div className="OwnersTableWrapper">
                <BasicTable
                    items={duenos}
                    columns={[
                        { key: 'nombreCompleto', label: 'Nombre' },
                        { key: 'tipoIdentificacion', label: 'Tipo de Identificación' },
                        { key: 'numeroIdentificacion', label: 'Identificación' },
                        { key: 'direccion', label: 'Dirección' },
                        { key: 'telefono', label: 'Teléfono' },
                        { key: 'email', label: 'Email' }
                    ]}
                    renderActions={(dueno) => (
                        <>
                        {/* <ButtonField type={'button'} form={true} onclick={() => abrirModalMascotas(dueno)} className="Informacion" text="🔍🐶"/> */}
                        <ButtonField type={'button'} form={true} onclick={() => abrirModalMascotas(dueno)} className="Informacion" text="🐶"/>
                        <ButtonField type={'button'} form={true} onclick={() => abrirModal('editar', dueno)} className="Editar" text="✏️"/>
                        <ButtonField type={'button'} form={true} onclick={() => abrirModal('eliminar', dueno)} className="Eliminar" text="🗑️"/>
                        </>
                    )}
                />
            </div>
        </div>
        {/* MODAL */}
        {modalVisible && (
            <div className="OwnersModalBackdrop">
                <div className="OwnersModal">
                    <button className="OwnersModalCerrar" onClick={cerrarModal}>✖</button>
                    {modalTipo === 'eliminar' ? (
                        <>
                            <h3>¿Eliminar Dueño?</h3>
                            <p>¿Seguro que deseas eliminar a <strong>{duenoActual?.nombreCompleto}</strong>?</p>
                            <ButtonField type={'button'} form={true} onclick={handleEliminarConfirmado} className="Borrar" text={'Confirmar'} />
                        </>
                    ) : (
                        <>
                            <h3>{modalTipo === 'editar' ? 'Editar Dueño' : 'Nuevo Dueño'}</h3>
                            <form onSubmit={handleSubmit} className="OwnersForm">
                                {JSON.stringify(duenoActual)}
                                <InputField type={'text'} name="nombreCompleto" placeholder="Nombre completo" value={duenoActual?.nombreCompleto} onChange={e => {setDuenoActual({ ...duenoActual, nombreCompleto: e.target.value })}} required={true}/>
                                <SelectField name={'tipoIdentificacion'} placeholder={'Selecciona un Tipo de Identificación...'} options={tipoIdentificaciones} value={duenoActual?.tipoIdentificacion} onChange={e => {setDuenoActual({ ...duenoActual, tipoIdentificacion: e.target.value })}} required={true} />
                                <InputField type={'text'} name="numeroIdentificacion" placeholder="Identificación" value={duenoActual?.numeroIdentificacion} onChange={e => {setDuenoActual({ ...duenoActual, numeroIdentificacion: e.target.value })}} required={true}/>
                                <InputField type={'text'} name="direccion" placeholder="Dirección" value={duenoActual?.direccion} onChange={e => {setDuenoActual({ ...duenoActual, direccion: e.target.value })}} required={true}/>
                                <InputField type={'text'} name="telefono" placeholder="Teléfono" value={duenoActual?.telefono} onChange={e => {setDuenoActual({ ...duenoActual, telefono: e.target.value })}} required={true}/>
                                <InputField type={'email'} name={'email'} placeholder={'Correo electrónico'} value={duenoActual?.email} onChange={e => {setDuenoActual({ ...duenoActual, email: e.target.value })}} required={true}/>
                                <ButtonField type={'submit'} form={true} className="Agregar" text={modalTipo === 'editar' ? 'Actualizar' : 'Guardar'} />
                            </form>
                        </>
                    )}
                </div>
            </div>
        )}
        {modalMascotasVisible && (
            <div className="OwnersModalBackdrop">
                <div className="OwnersModal">
                    <button className="OwnersModalCerrar" onClick={cerrarModalMascotas}>✖</button>
                    <h3>Mascotas de {duenoActual?.nombreCompleto}</h3>
                    {mascotas.length > 0 ? (
                        <ul>
                            {mascotas.map((mascota) => (
                                <li key={mascota.mascotaId}>
                                    <strong>{mascota.nombreMascota}</strong> – {mascota.nombreRaza}, especie {mascota.especie}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Este dueño no tiene mascotas registradas.</p>
                    )}
                </div>
            </div>
        )}
    </>);
}
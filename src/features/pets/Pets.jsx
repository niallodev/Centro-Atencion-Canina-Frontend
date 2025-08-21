import { usePets } from '../../hooks/hooks'
import { InputField, SelectField, ButtonField, BasicTable } from '../../components/components'
import { especies, sexo } from '../../config/const/const'
import { formatDateToInput } from '../../utils/utils'
import '../../styles/feactures/Pets.css'

export default function Pets() {
    const { mascotas, modalVisible, modalTipo, mascotaActual, selectDuenos, selectRazas, 
        razasFiltradas, selectCategorias, setMascotaActual, abrirModal, cerrarModal,
        handleSubmit, handleEliminarConfirmado
    } = usePets();

    return (<>
        <div className="PetsContainer">
            <div className="PetsHeader">
                <h2>Mascotas Registradas</h2>
                <ButtonField type={'button'} form={true} onclick={() => abrirModal('agregar')} className="Agregar" text={'+ Nueva Mascota'} />
            </div>
            <div className="PetsTableWrapper">
                <BasicTable
                    items={mascotas}
                    columns={[
                        { key: 'nombreMascota', label: 'Nombre' },
                        { key: 'nombreDueno', label: 'Dueño' },
                        { key: 'especie', label: 'Especie' },
                        { key: 'nombreRaza', label: 'Raza' },
                        { key: 'fechaNacimiento', label: 'Fecha de Nacimiento' },
                        { key: 'sexo', label: 'Sexo' },
                        { key: 'color', label: 'Color' },
                        { key: 'peso', label: 'Peso(Kg)' },
                        { key: 'informacionAdicional', label: 'Informacion Adicional' }
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
            <div className="PetsModalBackdrop">
                <div className="PetsModal">
                    <button className="PetsModalCerrar" onClick={cerrarModal}>✖</button>
                    {modalTipo === 'eliminar' ? (
                        <>
                            <h3>¿Eliminar Mascota?</h3>
                            <p>¿Seguro que deseas eliminar a <strong>{mascotaActual?.nombreMascota}</strong>?</p>
                            <ButtonField type={'button'} form={true} onclick={handleEliminarConfirmado} className="Borrar" text={'Confirmar'} />
                        </>
                    ) : (
                        <>
                            <h3>{modalTipo === 'editar' ? 'Editar Mascota' : 'Nueva Mascota'}</h3>
                            <form onSubmit={handleSubmit} className="PetsForm">
                                <SelectField name={'nombreDueno'} placeholder={'Selecciona el Dueño...'} options={selectDuenos} value={mascotaActual?.duenoId} onChange={e => {setMascotaActual({ ...mascotaActual, duenoId: e.target.value })}} required={true} />
                                <InputField type={'text'} name="nombreMascota" placeholder="Nombre del Canino" value={mascotaActual?.nombreMascota} onChange={e => {setMascotaActual({ ...mascotaActual, nombreMascota: e.target.value })}} required={true}/>
                                <SelectField name={'espcecie'} placeholder={'Selecciona la Especie...'} options={especies} value={mascotaActual?.especie} onChange={e => {setMascotaActual({ ...mascotaActual, especie: e.target.value })}} required={true} />
                                <SelectField name={'cateogria'} placeholder={'Selecciona la Categoria...'} options={selectCategorias} value={mascotaActual?.categoriaId} 
                                onChange={e => {
                                    setMascotaActual({ 
                                        ...mascotaActual, 
                                        categoriaId: e.target.value,
                                        razaId: ''
                                    })}} 
                                required={true} />
                                <SelectField name={'raza'} placeholder={'Selecciona la Raza...'} options={razasFiltradas} value={mascotaActual?.razaId} 
                                onChange={e => {
                                    const selectedRazaId = Number(e.target.value);
                                   console.log(selectRazas);
                                    const razaSeleccionada = selectRazas.find(raza => raza.categoriaId === selectedRazaId);
                                    setMascotaActual({ 
                                        ...mascotaActual, 
                                        razaId: e.target.value,
                                        categoriaId: razaSeleccionada?.categoriaId ?? ''
                                    })}}
                                required={true} />
                                
                                <InputField type={'date'} name="fechaNacimiento" placeholder="Fecha de Nacimiento" value={formatDateToInput(mascotaActual?.fechaNacimiento)} onChange={e => {setMascotaActual({ ...mascotaActual, fechaNacimiento: e.target.value })}} required={true}/>
                                <SelectField name={'sexo'} placeholder={'Selecciona el Sexo...'} options={sexo} value={mascotaActual?.sexo} onChange={e => {setMascotaActual({ ...mascotaActual, sexo: e.target.value })}} required={true} />
                                <InputField type={'text'} name="color" placeholder="Color del Canino" value={mascotaActual?.color} onChange={e => {setMascotaActual({ ...mascotaActual, color: e.target.value })}} required={true}/>
                                <InputField type={'text'} name="peso" placeholder="Ingrese el Peso del Canino" value={mascotaActual?.peso} onChange={e => {setMascotaActual({ ...mascotaActual, peso: e.target.value })}} required={true}/>
                                <InputField type={'text'} name={'informacionAdicional'} placeholder={'Información Adicional'} value={mascotaActual?.informacionAdicional} onChange={e => {setMascotaActual({ ...mascotaActual, informacionAdicional: e.target.value })}} required={true}/>
                                <ButtonField type={'submit'} form={true} className="Agregar" text={modalTipo === 'editar' ? 'Actualizar' : 'Guardar'} />
                            </form>
                        </>
                    )}
                </div>
            </div>
        )}
    </>);
}
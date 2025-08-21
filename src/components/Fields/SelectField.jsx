import './Fields.css'

export default function SelectField({
    placeholder, options, onChange, name, value, required = false
}) {
    return (
        <select name={name} className='SelectField' onChange={onChange} value={value} required={required}>
            <option value=''>{placeholder}</option>
            {options.map((option, index) => {
                // Si es objeto: intenta detectar automáticamente las claves
                if (typeof option === 'object' && option !== null) {
                    // Tomamos la primera propiedad como value y la segunda como label
                    const keys = Object.keys(option);
                    const valueKey = keys[0]; 
                    const labelKey = keys[1]; 

                    return (
                        <option key={index} value={option[valueKey]}>
                            {option[labelKey]}
                        </option>
                    );
                }

                // Si es string o número
                return (
                    <option key={index} value={option}>
                        {option}
                    </option>
                );
            })}
        </select>
    );
}
import './Fields.css'

export default function SelectField({
    placeholder, options, onChange, name, value, required= false
}) {
    console.log(onChange);
    return (
        <select name={name} className='SelectField'  onChange={onChange} value={value} required={required}>
            <option value=''>{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    );
}


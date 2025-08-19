import './Fields.css'

export default function InputField({
    type, name, placeholder, value, onChange, className, required
}) {
    return (
         <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={
                type !== 'checkbox' 
                ?`InputField ${className}`
                : undefined
            }
            required={required}
            />
    );
}


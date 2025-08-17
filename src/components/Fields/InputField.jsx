import './Fields.css'

export default function InputField({type, placeholder, value, onChange, className, required}) {
    return (
         <input
            type={type}
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


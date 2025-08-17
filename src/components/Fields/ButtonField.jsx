import './Fields.css'

export default function ButtonField({type, className, required}) {
    return (
        <button type={type} 
        className={`ButtonField ${className}`}
        >
            Login
        </button>
    );
}


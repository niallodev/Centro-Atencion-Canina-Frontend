import './Fields.css'

export default function ButtonField({type, className, text}) {
    return (
        <button type={type} 
        className={`ButtonField ${className}`}
        >
            {text}
        </button>
    );
}


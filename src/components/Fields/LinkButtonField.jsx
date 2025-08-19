import './Fields.css'

export default function LinkButtonField({type, className, onClick ,text}) {
    return (
        <button type={type} className={`LinkButtonField ${className}`} onClick={onClick}>
            {text}
        </button>
    );
}


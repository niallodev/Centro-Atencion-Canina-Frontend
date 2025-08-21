import './Fields.css'

export default function ButtonField({ type, className, text, onclick, form = false }) {
    return (
        <button type={type}
            className={form ? `ButtonForm${className}` : `ButtonField ${className}`}
            onClick={onclick ? onclick : undefined}
        >
            {text}
        </button>
    );
}


import './Cards.css'

export default function Card({title, text}) {
    return (
        <div className="Card">
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
}

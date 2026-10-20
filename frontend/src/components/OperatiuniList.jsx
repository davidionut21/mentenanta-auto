import OperatiuneCard from "./OperatiuneCard.jsx";

export default function OperatiuniList({ operatiuni }) {
    if (operatiuni.length === 0) {
        return (
            <p className="empty">
                Nu există nicio operațiune.
            </p>
        );
    }

    return (
        <ul className="item-list">
            {operatiuni.map((operatiune) => (
                <OperatiuneCard
                    key={operatiune.id}
                    operatiune={operatiune}
                />
            ))}
        </ul>
    );
}
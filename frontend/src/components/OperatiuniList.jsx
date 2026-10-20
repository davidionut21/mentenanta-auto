import OperatiuneCard from "./OperatiuneCard.jsx";

export default function OperatiuniList({ operatiuni }) {
    if (operatiuni.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-symbol">
                    0
                </div>

                <h3>
                    Nu există operațiuni
                </h3>

                <p>
                    Lista operațiunilor de mentenanță este momentan goală.
                </p>
            </div>
        );
    }

    return (
        <ul className="operation-list">
            {operatiuni.map((operatiune) => (
                <OperatiuneCard
                    key={operatiune.id}
                    operatiune={operatiune}
                />
            ))}
        </ul>
    );
}
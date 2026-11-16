
import OperatiuneCard from "./OperatiuneCard.jsx";
import styles from "./OperatiuniList.module.css";

export default function OperatiuniList({
    operatiuni,
    onToggle,
    onDelete
}) {
    if (operatiuni.length === 0) {
        return (
            <div className={styles.empty} data-testid="empty">
                <div className={styles.symbol}>0</div>

                <h3>Nu există operațiuni</h3>

                <p>
                    Lista operațiunilor de mentenanță este momentan goală.
                </p>
            </div>
        );
    }

    return (
        <ul className={styles.list}>
            {operatiuni.map((operatiune) => (
                <OperatiuneCard
                    key={operatiune.id}
                    operatiune={operatiune}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

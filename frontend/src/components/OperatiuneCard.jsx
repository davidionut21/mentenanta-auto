
import { Link } from "react-router-dom";
import { CODURI_TIP, ETICHETE_TIP } from "../constants.js";
import styles from "./OperatiuneCard.module.css";

export default function OperatiuneCard({
    operatiune,
    onToggle,
    onDelete
}) {
    return (
        <li
            className={`${styles.card} ${operatiune.completed ? styles.done : ""}`}
            data-testid="item"
            data-id={operatiune.id}
        >
            <div className={styles.code}>
                <span>{CODURI_TIP[operatiune.type]}</span>

                <strong>
                    #{String(operatiune.id).padStart(3, "0")}
                </strong>
            </div>

            <div className={styles.content}>
                <div className={styles.main}>
                    <input
                        type="checkbox"
                        checked={operatiune.completed}
                        onChange={() => onToggle(operatiune.id)}
                        aria-label={`Marchează ${operatiune.operation}`}
                        data-testid="item-toggle"
                    />

                    <div>
                        <Link
                            to={`/operatiuni/${operatiune.id}`}
                            className={styles.title}
                            data-testid="item-link"
                        >
                            {operatiune.operation}
                        </Link>

                        <span
                            className={`${styles.badge} ${styles[operatiune.type]}`}
                        >
                            {ETICHETE_TIP[operatiune.type]}
                        </span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <span
                        className={`${styles.status} ${
                            operatiune.completed
                                ? styles.completed
                                : styles.pending
                        }`}
                    >
                        <i />
                        {operatiune.completed
                            ? "Efectuat"
                            : "În așteptare"}
                    </span>

                    <button
                        className={styles.deleteButton}
                        onClick={() => onDelete(operatiune.id)}
                        aria-label={`Șterge ${operatiune.operation}`}
                        data-testid="item-delete"
                    >
                        Șterge
                    </button>
                </div>
            </div>
        </li>
    );
}

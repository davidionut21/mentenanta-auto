const ETICHETE_TIP = {
    maintenance: "Mentenanță",
    repair: "Reparație",
    inspection: "Inspecție"
};

const CODURI_TIP = {
    maintenance: "MNT",
    repair: "REP",
    inspection: "INS"
};

export default function OperatiuneCard({ operatiune }) {
    return (
        <li
            className={
                operatiune.completed
                    ? "operation-card done"
                    : "operation-card"
            }
        >
            <div className="operation-code">
                <span>
                    {CODURI_TIP[operatiune.type]}
                </span>

                <strong>
                    #{String(operatiune.id).padStart(3, "0")}
                </strong>
            </div>

            <div className="operation-content">
                <div className="operation-main">
                    <h3>
                        {operatiune.operation}
                    </h3>

                    <span
                        className={`type-badge type-badge-${operatiune.type}`}
                    >
                        {ETICHETE_TIP[operatiune.type]}
                    </span>
                </div>

                <div
                    className={
                        operatiune.completed
                            ? "operation-status operation-status-done"
                            : "operation-status operation-status-pending"
                    }
                >
                    <span></span>

                    {operatiune.completed
                        ? "Efectuat"
                        : "În așteptare"}
                </div>
            </div>
        </li>
    );
}
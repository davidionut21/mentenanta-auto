const ETICHETE_TIP = {
    maintenance: "Mentenanță",
    repair: "Reparație",
    inspection: "Inspecție"
};

export default function OperatiuneCard({ operatiune }) {
    return (
        <li className={operatiune.completed ? "item-card done" : "item-card"}>
            <div>
                <h3>{operatiune.operation}</h3>

                <span className={`badge badge-${operatiune.type}`}>
                    {ETICHETE_TIP[operatiune.type]}
                </span>
            </div>

            <span className="status">
                {operatiune.completed ? "Efectuat" : "În așteptare"}
            </span>
        </li>
    );
}
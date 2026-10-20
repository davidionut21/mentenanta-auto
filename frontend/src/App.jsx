import OperatiuniList from "./components/OperatiuniList.jsx";

const operatiuni = [
    {
        id: 1,
        operation: "Schimb ulei motor",
        completed: true,
        type: "maintenance"
    },
    {
        id: 2,
        operation: "Schimb plăcuțe frână față",
        completed: false,
        type: "repair"
    },
    {
        id: 3,
        operation: "Verificare presiune anvelope",
        completed: false,
        type: "inspection"
    }
];

export default function App() {
    const total = operatiuni.length;

    const inAsteptare = operatiuni.filter(
        (operatiune) => !operatiune.completed
    ).length;

    const finalizate = operatiuni.filter(
        (operatiune) => operatiune.completed
    ).length;

    const mentenanta = operatiuni.filter(
        (operatiune) => operatiune.type === "maintenance"
    ).length;

    const reparatii = operatiuni.filter(
        (operatiune) => operatiune.type === "repair"
    ).length;

    const inspectii = operatiuni.filter(
        (operatiune) => operatiune.type === "inspection"
    ).length;

    const progres = total === 0
        ? 0
        : Math.round((finalizate / total) * 100);

    return (
        <div className="app-shell">
            <header className="hero">
                <div className="hero-inner">
                    <div className="brand">
                        <div className="brand-mark">
                            AM
                        </div>

                        <div>
                            <p className="eyebrow">
                                AUTO MAINTENANCE SYSTEM
                            </p>

                            <h1>
                                Sistem de gestiune a mentenantei auto
                            </h1>
                        </div>
                    </div>

                    <p className="hero-description">
                        Monitorizarea centralizată a operațiunilor de
                        mentenanță, reparație și inspecție ale autovehiculului.
                    </p>

                    <div className="hero-status">
                        <span className="hero-status-dot"></span>
                        Sistem activ
                    </div>
                </div>
            </header>

            <main className="dashboard">
                <section className="stats-grid">
                    <article className="stat-card">
                        <div className="stat-icon stat-icon-blue">
                            01
                        </div>

                        <div>
                            <span className="stat-label">
                                Total operațiuni
                            </span>

                            <strong className="stat-value">
                                {total}
                            </strong>
                        </div>
                    </article>

                    <article className="stat-card">
                        <div className="stat-icon stat-icon-orange">
                            02
                        </div>

                        <div>
                            <span className="stat-label">
                                În așteptare
                            </span>

                            <strong className="stat-value">
                                {inAsteptare}
                            </strong>
                        </div>
                    </article>

                    <article className="stat-card">
                        <div className="stat-icon stat-icon-green">
                            03
                        </div>

                        <div>
                            <span className="stat-label">
                                Finalizate
                            </span>

                            <strong className="stat-value">
                                {finalizate}
                            </strong>
                        </div>
                    </article>
                </section>

                <div className="dashboard-grid">
                    <section className="operations-panel">
                        <div className="section-heading">
                            <div>
                                <p className="section-kicker">
                                    SERVICE HISTORY
                                </p>

                                <h2>
                                    Operațiuni
                                </h2>
                            </div>

                            <span className="operation-count">
                                {total} înregistrări
                            </span>
                        </div>

                        <OperatiuniList operatiuni={operatiuni} />
                    </section>

                    <aside className="overview-panel">
                        <div className="section-heading">
                            <div>
                                <p className="section-kicker">
                                    VEHICLE STATUS
                                </p>

                                <h2>
                                    Prezentare generală
                                </h2>
                            </div>
                        </div>

                        <div className="progress-card">
                            <div className="progress-top">
                                <span>
                                    Progres mentenanță
                                </span>

                                <strong>
                                    {progres}%
                                </strong>
                            </div>

                            <div className="progress-track">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progres}%` }}
                                ></div>
                            </div>

                            <p>
                                {finalizate} din {total} operațiuni finalizate
                            </p>
                        </div>

                        <div className="overview-list">
                            <div className="overview-row">
                                <div className="overview-name">
                                    <span className="type-dot type-maintenance"></span>
                                    Mentenanță
                                </div>

                                <strong>
                                    {mentenanta}
                                </strong>
                            </div>

                            <div className="overview-row">
                                <div className="overview-name">
                                    <span className="type-dot type-repair"></span>
                                    Reparații
                                </div>

                                <strong>
                                    {reparatii}
                                </strong>
                            </div>

                            <div className="overview-row">
                                <div className="overview-name">
                                    <span className="type-dot type-inspection"></span>
                                    Inspecții
                                </div>

                                <strong>
                                    {inspectii}
                                </strong>
                            </div>
                        </div>

                        <div className="vehicle-card">
                            <span className="vehicle-label">
                                STATUS VEHICUL
                            </span>

                            <strong>
                                Monitorizat
                            </strong>

                            <p>
                                Toate operațiunile sunt urmărite în sistem.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="app-footer">
                Sistem de gestiune a mentenantei auto
                <span></span>
                Proiect Tehnologii Web
            </footer>
        </div>
    );
}
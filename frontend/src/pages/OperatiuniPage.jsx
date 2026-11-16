
import { useEffect, useState } from "react";
import {
    createOperatiune,
    deleteOperatiune,
    fetchOperatiuni,
    updateOperatiune
} from "../api.js";
import OperatiuneForm from "../components/OperatiuneForm.jsx";
import OperatiuniList from "../components/OperatiuniList.jsx";
import styles from "./OperatiuniPage.module.css";

export default function OperatiuniPage() {
    const [operatiuni, setOperatiuni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function load() {
            try {
                const data = await fetchOperatiuni();
                if (!ignore) setOperatiuni(data);
            } catch (err) {
                if (!ignore) setError(err.message);
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        load();

        return () => {
            ignore = true;
        };
    }, []);

    async function handleAdd(operatiune) {
        const creata = await createOperatiune(operatiune);
        setOperatiuni((prev) => [...prev, creata]);
    }

    async function handleToggle(id) {
        const operatiune = operatiuni.find((o) => o.id === id);

        if (!operatiune) return;

        try {
            const actualizata = await updateOperatiune(id, {
                completed: !operatiune.completed
            });

            setOperatiuni((prev) =>
                prev.map((o) => o.id === id ? actualizata : o)
            );

            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete(id) {
        try {
            await deleteOperatiune(id);

            setOperatiuni((prev) =>
                prev.filter((o) => o.id !== id)
            );

            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }

    const total = operatiuni.length;

    const finalizate = operatiuni.filter(
        (o) => o.completed
    ).length;

    const inAsteptare = total - finalizate;

    const progres =
        total === 0
            ? 0
            : Math.round((finalizate / total) * 100);

    const mentenanta = operatiuni.filter(
        (o) => o.type === "maintenance"
    ).length;

    const reparatii = operatiuni.filter(
        (o) => o.type === "repair"
    ).length;

    const inspectii = operatiuni.filter(
        (o) => o.type === "inspection"
    ).length;

    return (
        <div className={styles.dashboard}>
            <section className={styles.statsGrid}>
                <article className={styles.statCard}>
                    <span className={`${styles.statIcon} ${styles.blue}`}>
                        01
                    </span>
                    <div>
                        <span className={styles.statLabel}>
                            Total operațiuni
                        </span>
                        <strong className={styles.statValue}>
                            {total}
                        </strong>
                    </div>
                </article>

                <article className={styles.statCard}>
                    <span className={`${styles.statIcon} ${styles.orange}`}>
                        02
                    </span>
                    <div>
                        <span className={styles.statLabel}>
                            În așteptare
                        </span>
                        <strong className={styles.statValue}>
                            {inAsteptare}
                        </strong>
                    </div>
                </article>

                <article className={styles.statCard}>
                    <span className={`${styles.statIcon} ${styles.green}`}>
                        03
                    </span>
                    <div>
                        <span className={styles.statLabel}>
                            Finalizate
                        </span>
                        <strong className={styles.statValue}>
                            {finalizate}
                        </strong>
                    </div>
                </article>
            </section>

            <div className={styles.grid}>
                <section className={styles.panel}>
                    <div className={styles.sectionHeading}>
                        <div>
                            <p className={styles.kicker}>
                                SERVICE HISTORY
                            </p>
                            <h2>Operațiuni</h2>
                        </div>

                        <span className={styles.count}>
                            {total} înregistrări
                        </span>
                    </div>

                    <OperatiuneForm onAdd={handleAdd} />

                    {loading && (
                        <p className="info" data-testid="loading">
                            Se încarcă operațiunile...
                        </p>
                    )}

                    {error && (
                        <p className="error" data-testid="error">
                            Nu am putut finaliza cererea: {error}.
                            Verifică <code>npm run api</code>.
                        </p>
                    )}

                    {!loading && (
                        <OperatiuniList
                            operatiuni={operatiuni}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                    )}
                </section>

                <aside className={`${styles.panel} ${styles.overview}`}>
                    <div className={styles.sectionHeading}>
                        <div>
                            <p className={styles.kicker}>
                                VEHICLE STATUS
                            </p>
                            <h2>Prezentare generală</h2>
                        </div>
                    </div>

                    <div className={styles.progressCard}>
                        <div className={styles.progressTop}>
                            <span>Progres mentenanță</span>
                            <strong>{progres}%</strong>
                        </div>

                        <div className={styles.progressTrack}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${progres}%` }}
                            />
                        </div>

                        <p>
                            {finalizate} din {total} operațiuni finalizate
                        </p>
                    </div>

                    <div className={styles.overviewList}>
                        <div>
                            <span>
                                <i className={styles.maintenance} />
                                Mentenanță
                            </span>
                            <strong>{mentenanta}</strong>
                        </div>

                        <div>
                            <span>
                                <i className={styles.repair} />
                                Reparații
                            </span>
                            <strong>{reparatii}</strong>
                        </div>

                        <div>
                            <span>
                                <i className={styles.inspection} />
                                Inspecții
                            </span>
                            <strong>{inspectii}</strong>
                        </div>
                    </div>

                    <div className={styles.vehicleCard}>
                        <small>STATUS VEHICUL</small>
                        <strong>Monitorizat</strong>
                        <p>
                            Toate operațiunile sunt urmărite în sistem.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}

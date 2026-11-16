
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOperatiune } from "../api.js";
import { ETICHETE_TIP } from "../constants.js";
import styles from "./OperatiuneDetaliuPage.module.css";

function Detaliu({ id }) {
    const [operatiune, setOperatiune] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        fetchOperatiune(id)
            .then((data) => {
                if (!ignore) setOperatiune(data);
            })
            .catch((err) => {
                if (!ignore) setError(err.message);
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [id]);

    if (loading) {
        return (
            <p className="info" data-testid="loading">
                Se încarcă operațiunea...
            </p>
        );
    }

    if (error || !operatiune) {
        return (
            <section className={styles.detail}>
                <p className="error" data-testid="error">
                    Operațiunea nu a putut fi încărcată:{" "}
                    {error ?? "Nu există."}
                </p>

                <Link to="/" className={styles.back}>
                    Înapoi la operațiuni
                </Link>
            </section>
        );
    }

    return (
        <section className={styles.detail} data-testid="detail">
            <Link to="/" className={styles.back}>
                Înapoi la operațiuni
            </Link>

            <p className={styles.kicker}>
                FIȘĂ OPERAȚIUNE #{operatiune.id}
            </p>

            <h2
                className={operatiune.completed ? styles.done : undefined}
                data-testid="detail-title"
            >
                {operatiune.operation}
            </h2>

            <dl className={styles.fields}>
                <dt>Categorie</dt>
                <dd>
                    {ETICHETE_TIP[operatiune.type] ?? operatiune.type}
                </dd>

                <dt>Stare</dt>
                <dd>
                    {operatiune.completed
                        ? "Efectuată"
                        : "În așteptare"}
                </dd>

                <dt>Identificator</dt>
                <dd>{operatiune.id}</dd>

                <dt>Detalii</dt>
                <dd>
                    {operatiune.description ||
                        "Nu există observații suplimentare."}
                </dd>
            </dl>
        </section>
    );
}

export default function OperatiuneDetaliuPage() {
    const { id } = useParams();

    return <Detaliu key={id} id={id} />;
}

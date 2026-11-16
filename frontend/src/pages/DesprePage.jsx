
import styles from "./PaginaInfo.module.css";

export default function DesprePage() {
    return (
        <section className={styles.panel}>
            <p className={styles.kicker}>DESPRE APLICAȚIE</p>

            <h2>Sistem de gestiune a mentenanței auto</h2>

            <p>
                Aplicația gestionează operațiunile de întreținere,
                reparație și inspecție ale unui autovehicul.
            </p>

            <p>
                Permite adăugarea operațiunilor, schimbarea stării
                și ștergerea lor, cu salvare prin API-ul REST.
            </p>

            <p>
                Tehnologii: HTML, CSS, JavaScript, React, Vite,
                React Router și json-server.
            </p>
        </section>
    );
}

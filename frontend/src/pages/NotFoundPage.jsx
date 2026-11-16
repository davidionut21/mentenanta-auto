
import { Link } from "react-router-dom";
import styles from "./PaginaInfo.module.css";

export default function NotFoundPage() {
    return (
        <section className={styles.panel} data-testid="not-found">
            <p className={styles.kicker}>EROARE 404</p>

            <h2>Pagina nu există</h2>

            <p>
                Adresa solicitată nu corespunde niciunei pagini din aplicație.
            </p>

            <Link to="/" className={styles.back}>
                Înapoi la operațiuni
            </Link>
        </section>
    );
}

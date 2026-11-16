
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function temaInitiala() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function navClass({ isActive }) {
    return isActive
        ? `${styles.navLink} ${styles.active}`
        : styles.navLink;
}

export default function Layout() {
    const [tema, setTema] = useState(temaInitiala);

    function handleTema() {
        const temaNoua = tema === "dark" ? "light" : "dark";

        setTema(temaNoua);
        document.documentElement.dataset.theme = temaNoua;
    }

    return (
        <div className={styles.shell}>
            <header className={styles.hero}>
                <div className={styles.inner}>
                    <div className={styles.topBar}>
                        <nav className={styles.nav} data-testid="nav">
                            <NavLink
                                to="/"
                                end
                                className={navClass}
                            >
                                Operațiuni
                            </NavLink>

                            <NavLink
                                to="/despre"
                                className={navClass}
                            >
                                Despre
                            </NavLink>
                        </nav>

                        <button
                            className={styles.themeToggle}
                            onClick={handleTema}
                            aria-pressed={tema === "dark"}
                        >
                            {tema === "dark"
                                ? "Mod luminos"
                                : "Mod întunecat"}
                        </button>
                    </div>

                    <div className={styles.brand}>
                        <div className={styles.mark}>AM</div>

                        <div>
                            <p className={styles.eyebrow}>
                                AUTO MAINTENANCE SYSTEM
                            </p>

                            <h1>
                                Sistem de gestiune a mentenantei auto
                            </h1>
                        </div>
                    </div>

                    <p className={styles.description}>
                        Monitorizarea centralizată a operațiunilor de mentenanță,
                        reparație și inspecție ale autovehiculului.
                    </p>

                    <div className={styles.status}>
                        <span />
                        Sistem activ
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <Outlet />
            </main>

            <footer className={styles.footer}>
                Sistem de gestiune a mentenantei auto
                <span />
                Proiect Tehnologii Web
            </footer>
        </div>
    );
}

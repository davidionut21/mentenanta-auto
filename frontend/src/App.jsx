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
    const inAsteptare = operatiuni.filter((o) => !o.completed).length;

    return (
        <>
            <header className="app-header">
                <h1>Sistem de gestiune a mentenantei auto</h1>

                <p>
                    Evidența operațiunilor de mentenanță ale autovehiculului.
                </p>

                <p className="app-count">
                    {operatiuni.length} operațiuni, dintre care {inAsteptare} în așteptare
                </p>
            </header>

            <main className="container">
                <section className="panel">
                    <h2>Operațiuni</h2>

                    <pre>
                        {JSON.stringify(operatiuni, null, 2)}
                    </pre>
                </section>
            </main>
        </>
    );
}
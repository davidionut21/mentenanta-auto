
import { useState } from "react";
import { TIPURI } from "../constants.js";
import styles from "./OperatiuneForm.module.css";

export default function OperatiuneForm({ onAdd }) {
    const [operation, setOperation] = useState("");
    const [type, setType] = useState("maintenance");
    const [eroare, setEroare] = useState("");
    const [trimite, setTrimite] = useState(false);

    function valideaza() {
        const nume = operation.trim();

        if (!nume) return "Numele operațiunii este obligatoriu.";

        if (nume.length > 100) {
            return "Numele poate avea maximum 100 de caractere.";
        }

        if (!TIPURI.some((tip) => tip.value === type)) {
            return "Alege un tip valid.";
        }

        return "";
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (trimite) return;

        const mesaj = valideaza();

        if (mesaj) {
            setEroare(mesaj);
            return;
        }

        setEroare("");
        setTrimite(true);

        try {
            await onAdd({
                operation: operation.trim(),
                completed: false,
                type
            });

            setOperation("");
            setType("maintenance");
        } catch (err) {
            setEroare(err.message);
        } finally {
            setTrimite(false);
        }
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            data-testid="form"
        >
            <label>
                Numele operațiunii
                <input
                    type="text"
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    maxLength={100}
                    placeholder="Ex: Înlocuire baterie"
                    aria-invalid={Boolean(eroare)}
                    data-testid="form-title"
                />
            </label>

            <label>
                Tipul operațiunii
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    data-testid="form-type"
                >
                    {TIPURI.map((tip) => (
                        <option key={tip.value} value={tip.value}>
                            {tip.label}
                        </option>
                    ))}
                </select>
            </label>

            {eroare && (
                <p className="error" data-testid="form-error">
                    {eroare}
                </p>
            )}

            <button
                className={styles.submit}
                type="submit"
                disabled={trimite}
                data-testid="form-submit"
            >
                {trimite ? "Se salvează..." : "Adaugă operațiune"}
            </button>
        </form>
    );
}

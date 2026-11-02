
 // Toate cererile HTTP sunt centralizate in acest fisier.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchOperatiuni() {
    const res = await fetch(`${API_URL}/operatiuni`);

    if (!res.ok) {
        throw new Error(`Eroare server: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
        throw new Error("Raspunsul API-ului nu este o lista de operatiuni");
    }

    return data;
}


export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    if (!res.ok) {
        throw new Error(`Eroare server: ${res.status}`);
    }

    return res.status === 204 ? null : res.json();
}

export async function fetchOperatiuni() {
    const data = await request("/operatiuni");

    if (!Array.isArray(data)) {
        throw new Error("Răspunsul API-ului nu este o listă de operațiuni.");
    }

    return data;
}

export function createOperatiune(operatiune) {
    return request("/operatiuni", {
        method: "POST",
        body: JSON.stringify(operatiune)
    });
}

export function updateOperatiune(id, changes) {
    return request(`/operatiuni/${id}`, {
        method: "PATCH",
        body: JSON.stringify(changes)
    });
}

export function deleteOperatiune(id) {
    return request(`/operatiuni/${id}`, {
        method: "DELETE"
    });
}

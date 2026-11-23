
export const TIPURI = ["maintenance", "repair", "inspection"];

const NUME_MAX = 100;
const DESCRIERE_MAX = 500;

export function valideazaOperatiune(body, { partial = false } = {}) {
    const erori = [];
    const date = {};

    if (
        body === null ||
        typeof body !== "object" ||
        Array.isArray(body)
    ) {
        return {
            erori: ["Datele trimise trebuie să fie un obiect JSON."],
            date: {}
        };
    }

    if (!partial || body.operation !== undefined) {
        if (
            typeof body.operation !== "string" ||
            body.operation.trim() === ""
        ) {
            erori.push("Numele operațiunii este obligatoriu.");
        } else if (body.operation.trim().length > NUME_MAX) {
            erori.push(
                `Numele operațiunii poate avea maximum ${NUME_MAX} de caractere.`
            );
        } else {
            date.operation = body.operation.trim();
        }
    }

    if (!partial || body.type !== undefined) {
        const tip =
            body.type === undefined ? "maintenance" : body.type;

        if (!TIPURI.includes(tip)) {
            erori.push(
                `Tipul trebuie să fie unul dintre: ${TIPURI.join(", ")}.`
            );
        } else {
            date.type = tip;
        }
    }

    if (body.completed !== undefined) {
        if (typeof body.completed !== "boolean") {
            erori.push("Starea completed trebuie să fie true sau false.");
        } else {
            date.completed = body.completed;
        }
    } else if (!partial) {
        date.completed = false;
    }

    if (body.description !== undefined) {
        if (typeof body.description !== "string") {
            erori.push("Descrierea trebuie să fie text.");
        } else if (body.description.trim().length > DESCRIERE_MAX) {
            erori.push(
                `Descrierea poate avea maximum ${DESCRIERE_MAX} de caractere.`
            );
        } else {
            date.description = body.description.trim();
        }
    }

    return { erori, date };
}

export function parseId(value) {
    if (!/^[1-9]\d*$/.test(String(value))) {
        return null;
    }

    const id = Number(value);

    return Number.isSafeInteger(id) ? id : null;
}

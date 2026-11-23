
import { Router } from "express";
import {
    parseId,
    valideazaOperatiune
} from "../validation.js";

const router = Router();

// Etapa 9: datele sunt păstrate temporar în memorie.
// În Etapa 10 vor fi mutate într-o bază de date MariaDB.

let operatiuni = [
    {
        id: 1,
        operation: "Schimb ulei motor",
        completed: true,
        type: "maintenance",
        description:
            "Înlocuirea uleiului de motor pentru întreținerea periodică."
    },
    {
        id: 2,
        operation: "Schimb plăcuțe frână față",
        completed: false,
        type: "repair",
        description:
            "Înlocuirea plăcuțelor de frână de pe puntea din față."
    },
    {
        id: 3,
        operation: "Verificare presiune anvelope",
        completed: false,
        type: "inspection",
        description:
            "Verificarea presiunii anvelopelor și corectarea valorilor, dacă este cazul."
    },
    {
        id: 4,
        operation: "Schimb filtru de aer",
        completed: false,
        type: "maintenance",
        description:
            "Înlocuirea filtrului de aer al motorului."
    },
    {
        id: 5,
        operation: "Verificare sistem electric",
        completed: true,
        type: "inspection",
        description:
            "Controlul conexiunilor și al principalelor componente electrice."
    }
];

let nextId = 6;

function gasesteIndex(req, res) {
    const id = parseId(req.params.id);

    if (id === null) {
        res.status(400).json({
            error: "ID-ul operațiunii este invalid."
        });

        return -1;
    }

    const index = operatiuni.findIndex(
        (operatiune) => operatiune.id === id
    );

    if (index === -1) {
        res.status(404).json({
            error: "Operațiunea nu există."
        });
    }

    return index;
}

// GET /operatiuni
router.get("/", (req, res) => {
    res.status(200).json(operatiuni);
});

// GET /operatiuni/:id
router.get("/:id", (req, res) => {
    const index = gasesteIndex(req, res);

    if (index === -1) return;

    res.status(200).json(operatiuni[index]);
});

// POST /operatiuni
router.post("/", (req, res) => {
    const { erori, date } = valideazaOperatiune(req.body ?? {});

    if (erori.length > 0) {
        return res.status(400).json({
            error: erori.join("; ")
        });
    }

    const operatiuneNoua = {
        id: nextId++,
        ...date
    };

    operatiuni.push(operatiuneNoua);

    return res.status(201).json(operatiuneNoua);
});

// PATCH /operatiuni/:id
router.patch("/:id", (req, res) => {
    const index = gasesteIndex(req, res);

    if (index === -1) return;

    const { erori, date } = valideazaOperatiune(
        req.body ?? {},
        { partial: true }
    );

    if (erori.length > 0) {
        return res.status(400).json({
            error: erori.join("; ")
        });
    }

    operatiuni[index] = {
        ...operatiuni[index],
        ...date
    };

    return res.status(200).json(operatiuni[index]);
});

// DELETE /operatiuni/:id
router.delete("/:id", (req, res) => {
    const index = gasesteIndex(req, res);

    if (index === -1) return;

    operatiuni.splice(index, 1);

    return res.status(204).end();
});

export default router;

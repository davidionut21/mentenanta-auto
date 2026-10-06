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

const TIPURI = ["maintenance", "repair", "inspection"];


function listeazaOperatiuni(lista) {
    return lista.map((o) => o.operation);
}


function numaraInAsteptare(lista) {
    return lista.filter((o) => !o.completed).length;
}


function cautaOperatiune(lista, text) {
    const textCautat = text.toLowerCase();

    return lista.filter((o) =>
        o.operation.toLowerCase().includes(textCautat)
    );
}


function nextId(lista) {
    return lista.reduce((max, o) => Math.max(max, o.id), 0) + 1;
}


function adaugaOperatiune(lista, operation, type = "maintenance") {
    const operationCurata = operation.trim();

    if (operationCurata === "") {
        console.log("Operațiunea nu poate fi goală.");
        return lista;
    }

    if (!TIPURI.includes(type)) {
        console.log("Tipul operațiunii nu este valid.");
        return lista;
    }

    const nouaOperatiune = {
        id: nextId(lista),
        operation: operationCurata,
        completed: false,
        type: type
    };

    return [...lista, nouaOperatiune];
}


function comutaStare(lista, id) {
    return lista.map((o) =>
        o.id === id
            ? { ...o, completed: !o.completed }
            : o
    );
}


function stergeOperatiune(lista, id) {
    return lista.filter((o) => o.id !== id);
}


console.log("--- Citire ---");

console.log(
    "Operațiuni:",
    listeazaOperatiuni(operatiuni).join(", ")
);

console.log(
    "În așteptare:",
    numaraInAsteptare(operatiuni)
);

console.log(
    "Căutare 'schimb':",
    listeazaOperatiuni(
        cautaOperatiune(operatiuni, "schimb")
    ).join(", ")
);


console.log("--- Adăugare ---");

let lista = adaugaOperatiune(
    operatiuni,
    "Schimb filtru aer",
    "maintenance"
);

console.log(
    "Lista nouă:",
    lista.length,
    "operațiuni"
);

console.log(
    "Originalul a rămas cu:",
    operatiuni.length,
    "operațiuni"
);


console.log("--- Modificare și ștergere ---");

lista = comutaStare(lista, 1);

console.log(
    "După schimbarea stării id 1, în așteptare:",
    numaraInAsteptare(lista)
);

lista = stergeOperatiune(lista, 3);

console.log(
    "După ștergerea id 3:",
    listeazaOperatiuni(lista).join(", ")
);


console.log("--- Validare ---");

adaugaOperatiune(lista, " ");

adaugaOperatiune(
    lista,
    "Ceva",
    "urgent"
);
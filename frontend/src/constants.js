
export const TIPURI = [
    {
        value: "maintenance",
        label: "Mentenanță",
        code: "MNT"
    },
    {
        value: "repair",
        label: "Reparație",
        code: "REP"
    },
    {
        value: "inspection",
        label: "Inspecție",
        code: "INS"
    }
];

export const ETICHETE_TIP = Object.fromEntries(
    TIPURI.map((tip) => [tip.value, tip.label])
);

export const CODURI_TIP = Object.fromEntries(
    TIPURI.map((tip) => [tip.value, tip.code])
);

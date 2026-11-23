
import express from "express";
import cors from "cors";
import operatiuniRouter from "./routes/operatiuni.js";

const app = express();

const CORS_ORIGIN =
    process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
    cors({
        origin: CORS_ORIGIN
    })
);

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});

app.use("/operatiuni", operatiuniRouter);

app.use((req, res) => {
    res.status(404).json({
        error: "Ruta nu există."
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    const status =
        Number.isInteger(err.status) &&
        err.status >= 400 &&
        err.status < 600
            ? err.status
            : 500;

    res.status(status).json({
        error:
            status === 500
                ? "Eroare internă a serverului."
                : err.message
    });
});

export default app;

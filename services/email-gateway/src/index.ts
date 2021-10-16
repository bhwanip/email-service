import express from "express";
import { initEmailRoutes } from "./routes";

const app = express();

app.use(express.json());

initEmailRoutes(app);

app.get("/api/health", (_, res) => {
    res.status(200).send('Ok');
})

app.listen(3000);


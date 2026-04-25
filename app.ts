import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(pinoHttp({ logger, serializers: {
  req(req) { return { id: req.id, method: req.method, url: req.url?.split("?")[0] }; },
  res(res) { return { statusCode: res.statusCode }; },
}}));
app.use(cors());

const ONE_TB = 1024 * 1024 * 1024 * 1024;
const HUGE_LIMIT = `${1000 * ONE_TB}b`;

app.use(express.json({ limit: HUGE_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: HUGE_LIMIT, parameterLimit: 1_000_000 }));
app.use(express.raw({ limit: HUGE_LIMIT, type: "application/octet-stream" }));
app.use(express.text({ limit: HUGE_LIMIT, type: "text/*" }));

app.use("/api", router);
export default app;

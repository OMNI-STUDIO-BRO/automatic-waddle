import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];
if (!rawPort) throw new Error("PORT env required");
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) throw new Error(`Invalid PORT: ${rawPort}`);

app.listen(port, (err) => {
  if (err) { logger.error({ err }, "listen error"); process.exit(1); }
  logger.info({ port }, "Server listening");
  startKeepAlive(port);
});

function startKeepAlive(port: number) {
  const targets: string[] = [`http://127.0.0.1:${port}/api/ping`];
  if (process.env["REPLIT_DEV_DOMAIN"]) targets.push(`https://${process.env["REPLIT_DEV_DOMAIN"]}/api/ping`);
  if (process.env["KEEP_ALIVE_URL"]) targets.push(process.env["KEEP_ALIVE_URL"]!);

  let success = 0, failure = 0;
  const ping = async () => {
    await Promise.allSettled(targets.map(async (url) => {
      try {
        const res = await fetch(url, { method: "GET", signal: AbortSignal.timeout(8000) });
        if (res.ok) success++; else failure++;
      } catch { failure++; }
    }));
  };
  setTimeout(ping, 2000);
  setInterval(ping, 1000);
  setInterval(() => logger.info({ success, failure, targets }, "Keep-alive heartbeat"), 60_000);

  process.on("uncaughtException", (err) => logger.error({ err: String(err) }, "uncaughtException — staying alive"));
  process.on("unhandledRejection", (reason) => logger.error({ reason: String(reason) }, "unhandledRejection — staying alive"));
  logger.info({ targets, intervalMs: 1000 }, "Keep-alive ping started (1s, runs forever)");
}

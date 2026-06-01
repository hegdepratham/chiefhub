import next from "next";
import { createServer } from "http";
import { parse } from "url";
import { startScheduler } from "./lib/jobs/scheduler";

import { initializeSocket } from "@/lib/socket";

const dev = process.env.NODE_ENV !== "production";

const hostname = "localhost";
const port = 3000;

const app = next({
  dev,
  hostname,
  port,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true);

    handle(req, res, parsedUrl);
  });

  initializeSocket(httpServer);
  startScheduler();
  httpServer.listen(port, () => {
    console.log(
      `> Server ready on http://${hostname}:${port}`
    );
  });
});
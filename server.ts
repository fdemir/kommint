import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { bundle } from "./bundler";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true);

    if (parsedUrl.pathname === "/api/bundler") {
      if (req.method !== "POST") {
        res.statusCode = 405;
        return res.end("Method not allowed");
      }

      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      await new Promise((resolve) => req.on("end", resolve));

      const { code } = JSON.parse(body);

      try {
        const x = await bundle(code);

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(x));
      } catch (e) {
        res.statusCode = 500;
        return res.end("Internal server error " + e);
      }
    }

    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});

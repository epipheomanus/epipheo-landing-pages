import compression from "compression";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Gzip/Brotli compression for all responses
  app.use(compression());

  // Security headers
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Hashed static assets — aggressive immutable cache (1 year)
  app.use(
    "/assets",
    express.static(path.join(staticPath, "assets"), {
      maxAge: "365d",
      immutable: true,
      etag: false,
      lastModified: false,
    })
  );

  // Other static files (favicon, logos) — moderate cache
  app.use(
    express.static(staticPath, {
      maxAge: "1h",
      index: false, // Don't auto-serve index.html from static middleware
    })
  );

  // SPA fallback: serve index.html for ALL routes with no-cache
  // This ensures query strings (UTM params, gclid, etc.) never cause issues
  app.get("*", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Epipheo Landing Pages — running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

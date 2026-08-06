// src/server/server.ts
import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

// Create Express app
export const app = express();

// Serve static files from the built React app (dist folder)
const staticPath = path.resolve(__dirname, '../../dist');
app.use(express.static(staticPath));

// Health‑check endpoint
app.get('/health', (req: Request, res: Response) => {
  const start = process.hrtime();
  const timestamp = new Date().toISOString();
  const responseBody = { status: 'ok' as const, timestamp };
  // Calculate response time
  const diff = process.hrtime(start);
  const responseTimeMs = diff[0] * 1000 + diff[1] / 1e6;
  console.log(`Health check response time: ${responseTimeMs.toFixed(3)} ms`);
  res.json(responseBody);
});

// Start HTTPS server if this module is executed directly
if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  const keyPath = path.resolve(__dirname, 'certs/key.pem');
  const certPath = path.resolve(__dirname, 'certs/cert.pem');
  const key = fs.readFileSync(keyPath);
  const cert = fs.readFileSync(certPath);
  https.createServer({ key, cert }, app).listen(port, () => {
    console.log(`HTTPS server listening on https://localhost:${port}`);
  });
}

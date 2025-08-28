const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;

// Enable metrics collection
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Create a custom counter metric
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['route', 'status_code'],
});

// Middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
     httpRequestCounter.inc({ route: req.path, status_code: res.statusCode });
  });
  next();
});

// Sample route
app.get('/', (req, res) => {
   res.send('Hello, world!');
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
   res.set('Content-Type', client.register.contentType);
   res.end(await client.register.metrics());
});

app.listen(port, () => {
   console.log(`App listening at http://localhost:${port}`);
});
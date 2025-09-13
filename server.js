import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Example API route
  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from server!' });
  });

  // Catch all routes with regex (Express 5 compatible)
  server.all(/.*/, (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

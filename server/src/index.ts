import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import process from 'node:process';
import { prisma } from './lib/prisma.js'; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/api/shops', async (req, res) => {
  try {
    const shops = await prisma.shop.findMany();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shops' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is flying on http://localhost:${PORT}`);
});